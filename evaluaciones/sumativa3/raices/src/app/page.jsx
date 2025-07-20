"use client"; // 🔒 Esto indica que este componente corre en el cliente

import { useEffect, useState } from "react";
import InscripcionesList from "../components/InscripcionesList";
 // Ajusta el path si está en otro lugar

export default function Home() {
  const [inscripciones, setInscripciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function obtenerDatos() {
      try {
       const [resInsc, resTall] = await Promise.all([
          fetch("https://ejemplo-firebase-657d0-default-rtdb.firebaseio.com/inscripciones.json"),
          fetch("https://ejemplo-firebase-657d0-default-rtdb.firebaseio.com/talleres.json"),
        ]);
 // 🔄 Convertimos la respuesta a formato JSON
        const [dataInsc, dataTall] = await Promise.all([
          resInsc.json(),
          resTall.json()
        ]);

        // 🧹 Eliminamos valores nulos del arreglo (por si hay un índice [null])
        const inscripcionesLimpias = (dataInsc || []).filter(Boolean);
        const talleresLimpios = (dataTall || []).filter(Boolean);

        // 🔗 Relacionamos cada inscripción con el taller completo
        const inscripcionesCompletas = inscripcionesLimpias.map((ins) => {
          const tallerRelacionado = talleresLimpios.find(t => t.id === ins.taller);
          return {
            ...ins,               // Copiamos los datos de inscripción
            taller: tallerRelacionado || {} // Añadimos el taller correspondiente
          };
        });

        // 💾 Guardamos las inscripciones ya combinadas
        setInscripciones(inscripcionesCompletas);
      } catch (error) {
        console.error("Error al cargar datos desde Firebase:", error);
      } finally {
        setCargando(false); // 🔄 Ya terminó de cargar
      }
    }

    obtenerDatos();
  }, []);

  return (
    <main className="min-h-screen bg-white p-4 text-gray-800">
      {cargando ? (
        <p className="text-center mt-10 text-gray-500">Cargando inscripciones...</p>
      ) : (
        <InscripcionesList inscripciones={inscripciones} />
      )}
    </main>
  );
}
