// src/utils/fetchData.js

const URL_INSCRIPCIONES = "https://ejemplo-firebase-657d0-default-rtdb.firebaseio.com/inscripciones.json";
const URL_TALLERES = "https://ejemplo-firebase-657d0-default-rtdb.firebaseio.com/talleres.json";

/**
 * Obtiene las inscripciones y las relaciona con los talleres desde Firebase.
 * @returns {Promise<Array>} Arreglo de inscripciones con datos de taller relacionados.
 */
export async function fetchData() {
  try {
    const [resIns, resTall] = await Promise.all([
      fetch(URL_INSCRIPCIONES),
      fetch(URL_TALLERES),
    ]);

    if (!resIns.ok || !resTall.ok) {
      throw new Error("Error en la respuesta de Firebase");
    }

    const inscripciones = await resIns.json();
    const talleres = await resTall.json();

    if (!inscripciones) return [];

    return Object.entries(inscripciones).map(([id, insc]) => ({
      id,
      ...insc,
      taller: talleres?.[insc.tallerId] || {
        nombre: "Taller no encontrado",
        descripcion: "",
        profesor: "No asignado"
      },
    }));
  } catch (error) {
    console.error("❌ Error al obtener datos:", error);
    return [];
  }
}
