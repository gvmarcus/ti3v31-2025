'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import InscriptionList from '@/components/InscriptionList';
import { fetchData } from '@/utils/fetchData';

export default function HomePage() {
  const [inscripciones, setInscripciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerDatos = async () => {
      const data = await fetchData();
      setInscripciones(data);
      setLoading(false);
    };
    obtenerDatos();
  }, []);

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <Header />
      {loading ? (
        <p className="text-center mt-10">Cargando inscripciones...</p>
      ) : inscripciones.length > 0 ? (
        <InscriptionList inscripciones={inscripciones} />
      ) : (
        <p className="text-center mt-10 text-red-500">No hay inscripciones disponibles.</p>
      )}
    </main>
  );
}
