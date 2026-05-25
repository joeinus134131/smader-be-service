import { PrismaService } from '../prisma/prisma.service';
import { CreateSignalDto } from './dto/create-signal.dto';
export declare class SignalsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createSignalDto: CreateSignalDto): Promise<{
        room: {
            id: string;
            roomNumber: string;
            currentPatientName: string | null;
            status: string;
            createdAt: Date;
            updatedAt: Date;
        };
        code: {
            id: string;
            fingerCount: number;
            meaning: string;
            urgencyLevel: string;
        };
    } & {
        id: string;
        createdAt: Date;
        isHandled: boolean;
        handledBy: string | null;
        roomId: string;
        codeNumber: number;
    }>;
    findAll(): Promise<({
        room: {
            id: string;
            roomNumber: string;
            currentPatientName: string | null;
            status: string;
            createdAt: Date;
            updatedAt: Date;
        };
        code: {
            id: string;
            fingerCount: number;
            meaning: string;
            urgencyLevel: string;
        };
    } & {
        id: string;
        createdAt: Date;
        isHandled: boolean;
        handledBy: string | null;
        roomId: string;
        codeNumber: number;
    })[]>;
    handleSignal(id: string, handledBy: string): Promise<{
        id: string;
        createdAt: Date;
        isHandled: boolean;
        handledBy: string | null;
        roomId: string;
        codeNumber: number;
    }>;
}
