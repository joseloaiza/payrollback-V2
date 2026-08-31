import { Module } from '@nestjs/common';
import { MovementService } from './movement.service';
import { MovementController } from './movement.controller';
import { Movement } from './entities/movement.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovementRepository } from './movement.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Movement])],
  providers: [MovementService, MovementRepository],
  controllers: [MovementController],
})
export class MovementModule {}
