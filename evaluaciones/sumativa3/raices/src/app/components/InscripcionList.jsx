// src/components/InscripcionList.jsx
import React from 'react';
import { InscripcionCard } from './InscripcionCard';
import { NoData } from './NoData';

export const InscripcionList = ({ inscripciones, talleres }) => {
  if (inscripciones.length === 0) {
    return <NoData />;
  }

  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {inscripciones.map((inscripcion) => {
        const taller = talleres[inscripcion.tallerId] || {};
        return (
          <InscripcionCard
            key={inscripcion.id}
            nombre={inscripcion.nombre}
            correo={inscripcion.correo}
            taller={taller}
          />
        );
      })}
    </section>
  );
};
