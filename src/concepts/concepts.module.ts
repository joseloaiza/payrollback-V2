import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConceptService } from './concepts.service';
import { ConceptsController } from './concepts.controller';
import { ConceptRepository } from './concept.repository';
import { Concept } from './concept.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Concept])],
  providers: [ConceptService, ConceptRepository],
  controllers: [ConceptsController],
  exports: [ConceptService],
})
export class ConceptsModule {}
