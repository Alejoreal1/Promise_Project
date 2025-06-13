async function analizarComentarioIA() {
  const comentario = document.getElementById("comentarioInput").value;
  const resultado = document.getElementById("comentarioResultado");
  resultado.textContent = "Analizando comentario...";

  if (!comentario.trim()) {
    resultado.textContent = "Por favor, escribe un comentario.";
    return;
  }

  // Usamos Gemini para analizar el sentimiento
  const apiKey = "AIzaSyDs-mJ6UWyvcac3yuTOt7mYFjodxzTMekw";
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  const prompt = `Indica si el siguiente comentario es positivo o negativo. Responde solo "positivo" o "negativo":\n\n"${comentario}"`;

  const requestBody = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.toLowerCase();

    if (text?.includes("positivo")) {
      resultado.textContent = "¡Comentario Positivo! 😊";
    } else if (text?.includes("negativo")) {
      resultado.textContent = "Comentario NEGATIVO. 😞";
    } else {
      resultado.textContent =
        "No se pudo determinar si el comentario es positivo o negativo.";
    }
  } catch (error) {
    resultado.textContent = "Error al analizar el comentario.";
  }
}

window.analizarComentarioIA = analizarComentarioIA;
