import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSignalDto {
  @IsString()
  @IsNotEmpty()
  room: string; // The room number coming from Python

  @IsNumber()
  @IsNotEmpty()
  code: number; // The code number (e.g. 1, 2, 3, 4)
}
