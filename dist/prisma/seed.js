"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const connectionString = process.env.DATABASE_URL;
const pool = new pg_1.Pool({ connectionString });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    console.log('Seeding database...');
    const room = await prisma.room.upsert({
        where: { roomNumber: '102' },
        update: {},
        create: {
            roomNumber: '102',
            currentPatientName: 'Pasien Dummy 102',
        },
    });
    const codesData = [
        { fingerCount: 1, meaning: 'Bantuan Ringan', urgencyLevel: 'Low' },
        { fingerCount: 2, meaning: 'Butuh Minum/Makan', urgencyLevel: 'Low' },
        { fingerCount: 3, meaning: 'Butuh ke Toilet', urgencyLevel: 'Medium' },
        { fingerCount: 4, meaning: 'DARURAT MEDIS', urgencyLevel: 'High' },
    ];
    for (const c of codesData) {
        await prisma.code.upsert({
            where: { fingerCount: c.fingerCount },
            update: {},
            create: c,
        });
    }
    console.log('Database seeded successfully!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map