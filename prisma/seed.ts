import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');
  
  // Seed Room
  const room = await prisma.room.upsert({
    where: { roomNumber: '102' },
    update: {},
    create: {
      roomNumber: '102',
      currentPatientName: 'Pasien Dummy 102',
    },
  });

  // Seed Codes (1 to 4 based on IoT payload)
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
