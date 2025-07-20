// app/layout.js o app/layout.tsx

// ✅ Importamos la fuente Montserrat desde Google Fonts
import { Montserrat } from "next/font/google";

// ✅ Importamos los componentes reutilizables
import Header from './components/Header';
import Footer from './components/Footer';

// ✅ Estilos globales (Tailwind y personalizados)
import './globals.css';

// 🎨 Configuramos Montserrat como variable CSS
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-montserrat' // Esta clase se aplica luego en el <body>
});

// 📄 Metadatos SEO del sitio
export const metadata = {
  title: 'Inscripciones a Talleres',
  description: 'SPA para visualizar inscripciones en Raíces Digitales',
};

// 🧱 Componente raíz que envuelve todas las páginas
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable} bg-white text-gray-900`}>
        {/* 📌 Encabezado fijo en todas las páginas */}
        <Header />

        {/* 🧩 Contenido que cambia según la ruta */}
        <main className="min-h-screen p-4">{children}</main>

        {/* 📌 Pie de página fijo */}
        <Footer />
      </body>
    </html>
  );
}
