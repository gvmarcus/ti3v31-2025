import InscriptionItem from './InscriptionItem';

export default function InscriptionList({ inscripciones }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {inscripciones.map((item) => (
        <InscriptionItem key={item.id} data={item} />
      ))}
    </div>
  );
}
