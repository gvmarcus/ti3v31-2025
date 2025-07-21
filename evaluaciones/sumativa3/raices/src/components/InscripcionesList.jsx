import InscripcionCard from "./InscripcionCard"; 

export default function InscripcionesList({ inscripciones }) {

  if (inscripciones.length === 0) {
    return (
      <p className="text-center text-red-500 mt-10">
        ⚠️ No hay inscripciones disponibles en este momento.
      </p>
    );
  }
  
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
      {inscripciones.map((inscripcion) => (
        <InscripcionCard key={inscripcion.id} inscripcion={inscripcion} />
      ))}
    </div>
  );
}