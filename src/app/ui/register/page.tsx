"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

type FormData = {
  email: string;
  password: string;
  username: string;
};

export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:3000/api/auth/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log(response)
      const result = await response.json();

      if (response.ok) {
        setMessage("Registro exitoso ✅");
      } else {
        setMessage(result.error || "Error en el registro ❌");
      }
    } catch (error) {
        console.log(error);
      setMessage("Error en el servidor ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-fit mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-center mb-4">Registro</h2>

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

        {/* Campo Username */}
        <div>
          <label className="block font-medium">Username:</label>
          <input
            type="text"
            {...register("username", { required: "El nombre de usuario es obligatorio" })}
            className="w-full border p-2 rounded"
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        </div>

        {/* Campo Password */}
        <div>
          <label className="block font-medium">Contraseña:</label>
          <input
            type="password"
            {...register("password", { required: "La contraseña es obligatoria", minLength: { value: 6, message: "Debe tener al menos 6 caracteres" } })}
            className="w-full border p-2 rounded"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>

        {/* Botón de Envío */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-700 text-white p-2 rounded hover:bg-blue-500 transition"
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
      
      {/* Mensajes de respuesta */}
      {message && <p className="mt-4 text-center font-medium">{message}</p>}

      <div className="mt-4 text-center">
        <Link href="./login" className="text-blue-600">Inicia Sesion Aqui</Link>
      </div>
    </div>
  );
}
