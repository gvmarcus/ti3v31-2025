// src/utils/fetchData.js
export async function fetchData() {
  try {
    const [resIns, resTall] = await Promise.all([
      fetch("https://ejemplo-firebase-657d0-default-rtdb.firebaseio.com/inscripciones.json"),
      fetch("https://ejemplo-firebase-657d0-default-rtdb.firebaseio.com/talleres.json"),
    ]);

    const inscripciones = await resIns.json();
    const talleres = await resTall.json();

    return Object.entries(inscripciones || {}).map(([id, insc]) => ({
      id,
      ...insc,
      taller: talleres?.[insc.tallerId] || {},
    }));
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return [];
  }
}
