"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Correcto para Next.js 13+
import { useForm } from "react-hook-form";
// import Link from "next/link";

type FormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // Este efecto asegura que useRouter solo se utiliza en el lado del cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setMessage("");
    console.log("{email: 'charro@gmail.com', password: 'as11'}")

    // Aquí solo tenemos un ejemplo simple para la comparación de contraseñas
    if (data.email === "uriel@gmail.com" && data.password === "pumas") {
      setMessage("Inicio de sesión exitoso ✅");
      if (isClient) {
        router.push("./carros"); // Redirige al dashboard después del login
      }
    } else {
      setMessage("Credenciales incorrectas ❌");
    }

    setLoading(false);
  };

  if (!isClient) {
    return null; 
  }

  return (
    <div className="max-w-screen-sm mx-auto mt-10 p-12 border border-black rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-center mb-4">Iniciar sesión</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Campo Email */}
        <div>
          <label className="block font-medium">Email:</label>
          <input
            type="email"
            {...register("email", { required: "El email es obligatorio" })}
            className="w-full border p-2 rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        {/* Campo Password */}
        <div>
          <label className="block font-medium">Contraseña:</label>
          <input
            type="password"
            {...register("password", { required: "La contraseña es obligatoria" })}
            className="w-full border p-2 rounded"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>

        {/* Botón de Envío */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-700 text-white p-2 rounded hover:bg-blue-500 transition"
        >
          {loading ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>
      </form>
      
      {/* Mensajes de respuesta */}
      {message && <p className="mt-4 text-center font-medium">{message}</p>}
    </div>
  );
}
