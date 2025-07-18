// src/components/InscripcionCard.jsx
import React from 'react';

export const InscripcionCard = ({ nombre, correo, taller }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 border hover:shadow-lg transition-all">
      <h2 className="text-xl font-semibold mb-2 text-indigo-600">{nombre}</h2>
      <p className="text-sm text-gray-700 mb-1"><strong>Correo:</strong> {correo}</p>
      <hr className="my-2" />
      <p className="text-gray-800"><strong>Taller:</strong> {taller.nombre || 'No disponible'}</p>
      <p className="text-gray-600 text-sm"><strong>Descripción:</strong> {taller.descripcion || 'Sin descripción'}</p>
      <p className="text-gray-600 text-sm"><strong>Profesor:</strong> {taller.profesor || 'Sin asignar'}</p>
    </div>
  );
};
