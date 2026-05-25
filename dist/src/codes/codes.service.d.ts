import { PrismaService } from '../prisma/prisma.service';
export declare class CodesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): import("@prisma/client").Prisma.Prisma__CodeClient<{
        id: string;
        fingerCount: number;
        meaning: string;
        urgencyLevel: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        fingerCount: number;
        meaning: string;
        urgencyLevel: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        fingerCount: number;
        meaning: string;
        urgencyLevel: string;
    }>;
    update(id: string, data: any): import("@prisma/client").Prisma.Prisma__CodeClient<{
        id: string;
        fingerCount: number;
        meaning: string;
        urgencyLevel: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__CodeClient<{
        id: string;
        fingerCount: number;
        meaning: string;
        urgencyLevel: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
