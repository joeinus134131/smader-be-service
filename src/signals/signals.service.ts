import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSignalDto } from './dto/create-signal.dto';

@Injectable()
export class SignalsService {
  constructor(private prisma: PrismaService) {}

  async create(createSignalDto: CreateSignalDto) {
    const { room, code } = createSignalDto;

    // 1. Find the room by roomNumber
    const roomRecord = await this.prisma.room.findUnique({
      where: { roomNumber: room },
    });

    if (!roomRecord) {
      throw new NotFoundException(`Room with number ${room} not found.`);
    }

    // 2. Check if the code exists
    const codeRecord = await this.prisma.code.findUnique({
      where: { fingerCount: code },
    });

    if (!codeRecord) {
      throw new NotFoundException(`Code ${code} is not defined in the system.`);
    }

    // 3. Create the signal
    const signal = await this.prisma.signal.create({
      data: {
        roomId: roomRecord.id,
        codeNumber: codeRecord.fingerCount,
      },
      include: {
        room: true,
        code: true,
      },
    });

    return signal;
  }

  async findAll() {
    return this.prisma.signal.findMany({
      include: {
        room: true,
        code: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async handleSignal(id: string, handledBy: string) {
    return this.prisma.signal.update({
      where: { id },
      data: {
        isHandled: true,
        handledBy,
      },
    });
  }
}
