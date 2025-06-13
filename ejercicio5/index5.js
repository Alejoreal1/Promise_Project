async function analizarComentarioIA() {
  const comentario = document.getElementById("comentarioInput").value;
  const resultado = document.getElementById("comentarioResultado");

  if (!comentario.trim()) {
    resultado.textContent = "Por favor, escribe un comentario.";
    return;
  }

  resultado.textContent = "Analizando comentario...";

  const apiKey = "AIzaSyDs-mJ6UWyvcac3yuTOt7mYFjodxzTMekw"; 
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  const prompt = `¿El siguiente comentario es positivo o negativo? Solo responde "positivo" o "negativo": "${comentario}"`;

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const json = await res.json();
    const respuesta = json.candidates[0].content.parts[0].text.toLowerCase();

    if (respuesta.includes("positivo")) {
      resultado.textContent = "¡Comentario Positivo! 😊";
    } else if (respuesta.includes("negativo")) {
      resultado.textContent = "Comentario NEGATIVO. 😞";
    } else {
      resultado.textContent = "No se pudo interpretar la respuesta.";
    }
  } catch (e) {
    resultado.textContent = "Error al conectar con la IA.";
    console.error(e);
  }
}

window.analizarComentarioIA = analizarComentarioIA;
