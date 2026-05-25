import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CodesService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.code.create({ data });
  }

  findAll() {
    return this.prisma.code.findMany();
  }

  async findOne(id: string) {
    const code = await this.prisma.code.findUnique({ where: { id } });
    if (!code) throw new NotFoundException(`Code with ID ${id} not found`);
    return code;
  }

  update(id: string, data: any) {
    return this.prisma.code.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.code.delete({
      where: { id },
    });
  }
}
