export default function InscriptionItem({ data }) {
  const { nombre, correo, taller } = data;

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-indigo-700">{nombre}</h2>
      <p className="text-sm text-gray-700">{correo}</p>
      <div className="mt-2">
        <h3 className="font-bold text-gray-800">{taller.nombre}</h3>
        <p className="text-gray-600 text-sm">{taller.descripcion}</p>
        <p className="text-sm text-indigo-600 mt-1">Profesor: {taller.profesor}</p>
      </div>
    </div>
  );
}
