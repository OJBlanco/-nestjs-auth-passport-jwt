import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsPositive,
  IsOptional,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string;

  @ApiProperty()
  @IsOptional()
  @IsPositive()
  readonly userId: number;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
