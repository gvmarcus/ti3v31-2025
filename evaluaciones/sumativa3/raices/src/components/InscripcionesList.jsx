export default function InscripcionesList({ inscripciones }) {
  if (inscripciones.length === 0) {
    return <p>No hay inscripciones disponibles.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {inscripciones.map((ins) => (
        <div key={ins.id} className="border p-4 rounded shadow bg-gray-50">
          <h2 className="font-bold text-lg">{ins.nombre}</h2>
          <p><strong>Taller:</strong> {ins.taller?.nombre || "Sin taller asignado"}</p>
          <p><strong>Día:</strong> {ins.taller?.dia || "No especificado"}</p>
        </div>
      ))}
    </div>
  );
}
