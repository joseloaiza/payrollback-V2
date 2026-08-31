import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
  ) {}

  findAll(): Promise<Role[]> {
    return this.roleRepo.find({ relations: ['permissions'] });
  }

  async findByName(name: string): Promise<Role> {
    const role = await this.roleRepo.findOne({
      where: { name },
      relations: ['permissions'],
    });
    if (!role) throw new NotFoundException(`Role "${name}" not found`);
    return role;
  }

  async findById(id: string): Promise<Role> {
    const role = await this.roleRepo.findOne({
      where: { id },
      relations: ['permissions'],
    });
    if (!role) throw new NotFoundException(`Role ${id} not found`);
    return role;
  }

  async assignPermissionsToRole(
    roleId: string,
    permissionNames: string[],
  ): Promise<Role> {
    const role = await this.findById(roleId);
    const permissions = await this.permissionRepo.findBy({
      name: In(permissionNames),
    });

    if (permissions.length !== permissionNames.length) {
      const found = permissions.map((p) => p.name);
      const missing = permissionNames.filter((n) => !found.includes(n));
      throw new BadRequestException(
        `Permissions not found: ${missing.join(', ')}`,
      );
    }

    role.permissions = permissions;
    return this.roleRepo.save(role);
  }

  findAllPermissions(): Promise<Permission[]> {
    return this.permissionRepo.find();
  }
}
