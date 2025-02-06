import { NextResponse } from "next/server";

// Definir una contraseña fija para la comparación
const fixedPassword = "arribalospumas";

export async function POST(request: Request) {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const { email, password } = await request.json();

    // Validar que ambos campos estén presentes
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son obligatorios" },
        { status: 400 }
      );
    }

    // Aquí solo comparamos la contraseña enviada con la fija
    if (password !== fixedPassword) {
      return NextResponse.json(
        { error: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    // Si la contraseña es correcta, responder con un mensaje de éxito
    return NextResponse.json(
      { message: "Inicio de sesión exitoso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
