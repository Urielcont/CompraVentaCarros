import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();  // Obtener el cuerpo de la solicitud

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Datos inválidos en la solicitud" }, { status: 400 });
    }

    const { email, password, username, rol = "user", status = true } = body;

    if (!email || !password || !username) {
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
    }

    // Verificar si el email ya está registrado
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "El email ya está registrado" }, { status: 409 });
    }

    // Crear usuario en la base de datos
    const newUser = await prisma.users.create({
      data: {
        email,
        password,
        username,
        rol,
        status,
      },
    });

    return NextResponse.json({ message: "Registro exitoso", user: newUser }, { status: 201 });

  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
