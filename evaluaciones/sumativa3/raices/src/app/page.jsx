"use client";

import { useState, useEffect } from "react";
import InscripcionCard from "../components/InscripcionCard";

export default function Home() {
  const [inscripciones, setInscripciones] = useState([]);
  const [talleres, setTalleres] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function obtenerDatos() {
      try {
        const [resInsc, resTall] = await Promise.all([
          fetch("https://ejemplo-firebase-657d0-default-rtdb.firebaseio.com/inscripciones.json"),
          fetch("https://ejemplo-firebase-657d0-default-rtdb.firebaseio.com/talleres.json"),
        ]);

        const [dataInsc, dataTall] = await Promise.all([
          resInsc.json(),
          resTall.json()
        ]);

        // 👇 Esta es la corrección clave
        const inscripcionesCompletas = dataInsc ? Object.values(dataInsc).filter(item => item !== null) : [];
        const arregloTalleres = dataTall ? Object.values(dataTall).filter(item => item !== null) : [];

        setInscripciones(inscripcionesCompletas);
        setTalleres(arregloTalleres);
      } catch (error) {
        console.error("Error al cargar datos desde Firebase:", error);
      } finally {
        setCargando(false);
      }
    }

    obtenerDatos();
  }, []);

  const obtenerTallerPorId = (idTaller) => {
    return talleres.find((taller) => taller.id === idTaller) || {};
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      {cargando ? (
        <p className="text-center text-gray-500">Cargando datos...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {inscripciones.map((inscripcion) => {
            const taller = obtenerTallerPorId(inscripcion.taller);
            const nombreCompleto = `${inscripcion.nombres || ''} ${inscripcion.apellidos || ''}`.trim();

            return (
              <InscripcionCard
                key={inscripcion.id}
                nombres={nombreCompleto || "Sin nombre"}
                correo={inscripcion.correo || "Sin correo"}
                tallerNombre={taller.nombre || "Taller no encontrado"}
                tallerDescripcion={taller.descripcion || "Sin descripción"}
                tallerProfesor={taller.profesor || "Sin profesor"}
              />
            );
          })}
        </div>
      )}
    </main>
  );
}
