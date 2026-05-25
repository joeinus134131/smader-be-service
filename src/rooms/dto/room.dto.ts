import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  roomNumber: string;

  @IsString()
  @IsOptional()
  currentPatientName?: string;

  @IsString()
  @IsOptional()
  status?: string;
}

export class UpdateRoomDto {
  @IsString()
  @IsOptional()
  roomNumber?: string;

  @IsString()
  @IsOptional()
  currentPatientName?: string;

  @IsString()
  @IsOptional()
  status?: string;
}
