export default function Footer() {
  return (
    <footer className="bg-[#2E2E2E] text-white text-center py-4 mt-10 w-full">
      <p className="text-sm">
        © {new Date().getFullYear()} Contacto: contacto@talleresurbanos.cl
      </p>
      <p>Síguenos en nuestras redes: <a href="#">@talleresurbanos</a> </p>
      <p>Telefono: <a href="#">+56 9 8760 54321</a> </p>  
    </footer>
  );
}