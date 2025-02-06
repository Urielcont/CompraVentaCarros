"use client";
import { useState, useEffect } from "react";

type Car = {
  id: number;
  modelo: string;
  marca: string;
  color: string;
  precio_venta: number;
  caracteristicas: string | null;
};

export default function CarList() {
  const [cars, setCars] = useState<Car[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch de la API para obtener todos los carros
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/carros");
        if (!response.ok) {
          throw new Error("Error al obtener los carros");
        }
        const data = await response.json();
        setCars(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchCars();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="car-list p-6 max-w-screen-xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">Lista de Carros</h2>
      
      {cars.length === 0 ? (
        <p className="text-center">No hay carros disponibles</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-3 px-6 text-left">Marca y Modelo</th>
                <th className="py-3 px-6 text-left">Color</th>
                <th className="py-3 px-6 text-left">Precio de Venta</th>
                <th className="py-3 px-6 text-left">Características</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car.id} className="border-b">
                  <td className="py-3 px-6">{car.marca} {car.modelo}</td>
                  <td className="py-3 px-6">{car.color}</td>
                  <td className="py-3 px-6">${car.precio_venta.toLocaleString()}</td>
                  <td className="py-3 px-6">{car.caracteristicas || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
