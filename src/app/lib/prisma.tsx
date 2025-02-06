// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Inicializamos el cliente de Prisma
const prisma = new PrismaClient();

// Exportamos la instancia del cliente
export { prisma };
