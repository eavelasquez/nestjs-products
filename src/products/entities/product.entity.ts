import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsInt, IsNotEmpty, IsOptional, IsDateString, IsNumber } from 'class-validator';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  code: number;

  @IsNotEmpty()
  @Column({ length: 24 })
  ref: string;

  @IsNotEmpty()
  @Column('varchar')
  name: string;

  @IsNotEmpty()
  @Column('varchar')
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Column('float')
  cost: number;

  @IsInt()
  @IsNotEmpty()
  @Column('int')
  count: number;

  @IsDateString()
  @IsNotEmpty()
  @Column('date')
  date: string;

  @IsOptional()
  @Column('varchar')
  img?: string;
}
