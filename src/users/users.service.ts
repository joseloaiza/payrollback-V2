import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, ResponseUserDto } from './dtos/createUserDto';
import { UpdateUserDto } from './dtos/updateUserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Company } from './../companies/entities/company.entity';
import { CompanyPayment } from './../companies/entities/companyPayment.entity';
import { CompanyPayroll } from './../companies/entities/companyPayroll.entity';
import { UsersCompany } from './entities/usersCompany.entity';
import { Concept } from '../concepts/concept.entity';
import { ConceptService } from '../concepts/concepts.service';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
//import { QueryBuilder } from 'typeorm-query-builder-wrapper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(UsersCompany)
    private usersCompanyRepository: Repository<UsersCompany>,
    @InjectRepository(CompanyPayment)
    private companyPaymentRepository: Repository<CompanyPayment>,
    @InjectRepository(CompanyPayroll)
    private companyPayrollRepository: Repository<CompanyPayroll>,
    @InjectRepository(Concept)
    private readonly conceptService: ConceptService,
    private readonly dataSource: DataSource, // ✅ Inject TypeORM DataSource for Transactions
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    // Start a transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { password, companyName, ...userData } = data;
      const newUser = await queryRunner.manager.save(User, {
        ...userData,
        companyName,
        password,
      });
      // Check if the company already exists
      let company = await this.companyRepository.findOne({
        where: { name: companyName },
      });
      // If the company does not exist, create a new one
      if (!company) {
        company = this.companyRepository.create({
          name: companyName,
          isActive: true,
        });
        company = await queryRunner.manager.save(Company, company);
      }
      // Create the related usersCompany entity
      const newUsersCompany = this.usersCompanyRepository.create({
        user: newUser,
        company: company,
      });

      //save company payment
      await queryRunner.manager.save(UsersCompany, newUsersCompany);
      const newCompanyPayment = this.companyPaymentRepository.create({
        id: company.id,
        createUser: newUser.id,
      });
      await queryRunner.manager.save(CompanyPayment, newCompanyPayment);

      //save company payroll
      await queryRunner.manager.save(UsersCompany, newUsersCompany);
      const newCompanyPayroll = this.companyPayrollRepository.create({
        id: company.id,
        createUser: newUser.id,
      });
      await queryRunner.manager.save(CompanyPayment, newCompanyPayroll);
      // get concepts base
      const concepts = await this.conceptService.getConceptsBase();

      const conceptEntities = concepts.map((co) => {
        co.company_id = company.id;
        co.createUser = newUser.id;
        return co;
      });
      await Promise.all(
        conceptEntities.map((c) => queryRunner.manager.save(Concept, c)),
      );

      await queryRunner.commitTransaction();
      return newUser;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      throw new InternalServerErrorException(
        'Failed to create user and related records.' + errorMessage,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findOneWithRoleAndPermissions(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['role', 'role.permissions'],
    });
  }

  async getUser(userName: string): Promise<User> {
    const user = this.userRepository.findOneBy({ userName });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.update({ id }, updateUserDto);
    return user;
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async getUserWithCompanies(userId: string): Promise<ResponseUserDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['companies', 'companies.company'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    const { companies, ...userWithoutCompanies } = user;

    const userCompanies = companies
      .map((userCompany) => userCompany.company)
      .map(({ id, name, isActive, img }) => ({
        id,
        name,
        isActive,
        img,
      }));

    const userDto = {
      user: userWithoutCompanies,
      companies: userCompanies,
    };

    return plainToInstance(ResponseUserDto, userDto);
  }
}
