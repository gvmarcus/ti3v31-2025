'use client';

import React, { useEffect, useState } from 'react';
import { InscripcionList } from '@/components/InscripcionList';

export default function Page() {
  const [inscripciones, setInscripciones] = useState([]);
  const [talleres, setTalleres] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const inscRes = await fetch(
          'https://ejemplo-firebase-657d0-default-rtdb.firebaseio.com/inscripciones.json'
        );
        const tallRes = await fetch(
          'https://ejemplo-firebase-657d0-default-rtdb.firebaseio.com/talleres.json'
        );

        const inscData = await inscRes.json();
        const tallData = await tallRes.json();

        const inscripcionesArray = Object.entries(inscData || {}).map(([id, data]) => ({ id, ...data }));
        setInscripciones(inscripcionesArray);
        setTalleres(tallData);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Listado de Inscripciones</h1>
      {cargando ? (
        <p className="text-center text-gray-600">Cargando datos...</p>
      ) : (
        <InscripcionList inscripciones={inscripciones} talleres={talleres} />
      )}
    </main>
  );
}
