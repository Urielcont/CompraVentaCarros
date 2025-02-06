// src/app/api/carros/route.ts

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Función para convertir BigInt a string en cualquier objeto
const convertBigIntToString = (obj: any) => {
  return JSON.parse(JSON.stringify(obj, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  ));
};

export async function GET() {
  try {
    // Consultar todos los carros desde la base de datos
    const cars = await prisma.carros.findMany();

    // Convertir BigInt a string en el objeto antes de enviarlo en la respuesta
    const serializedCars = convertBigIntToString(cars);

    // Si no se encuentran carros, devuelve un mensaje adecuado
    if (serializedCars.length === 0) {
      return NextResponse.json({ message: "No hay carros disponibles" }, { status: 404 });
    }

    // Devuelve los carros encontrados
    return NextResponse.json(serializedCars, { status: 200 });
  } catch (error) {
    console.error("Error al consultar carros:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
