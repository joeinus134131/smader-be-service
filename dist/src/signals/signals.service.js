"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SignalsService = class SignalsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createSignalDto) {
        const { room, code } = createSignalDto;
        const roomRecord = await this.prisma.room.findUnique({
            where: { roomNumber: room },
        });
        if (!roomRecord) {
            throw new common_1.NotFoundException(`Room with number ${room} not found.`);
        }
        const codeRecord = await this.prisma.code.findUnique({
            where: { fingerCount: code },
        });
        if (!codeRecord) {
            throw new common_1.NotFoundException(`Code ${code} is not defined in the system.`);
        }
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
    async handleSignal(id, handledBy) {
        return this.prisma.signal.update({
            where: { id },
            data: {
                isHandled: true,
                handledBy,
            },
        });
    }
};
exports.SignalsService = SignalsService;
exports.SignalsService = SignalsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SignalsService);
//# sourceMappingURL=signals.service.js.map