async function sendToGemini(inputText) {
  const responseContainer = document.getElementById("responseGemini");
  const loader = document.getElementById("loaderAll");
  const apiKey = "AIzaSyDs-mJ6UWyvcac3yuTOt7mYFjodxzTMekw";

  if (!inputText.trim()) {
    responseContainer.textContent = "Por favor, ingresa algún texto.";
    return;
  }

  responseContainer.textContent = "";
  loader.style.display = "block";

  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  const requestBody = {
    contents: [{ parts: [{ text: inputText }] }],
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error en la API:", data);
      responseContainer.textContent = `Error: ${response.status} - ${
        data.error?.message || "Error desconocido"
      }`;
      return;
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    responseContainer.textContent = text || "No se recibió contenido válido.";
  } catch (error) {
    console.error("Error:", error);
    responseContainer.textContent = "Error al conectar con la API.";
  } finally {
    loader.style.display = "none";
  }
}

async function sendToMistral(inputText) {
  const responseContainer = document.getElementById("responseMistral");
  const loader = document.getElementById("loaderAll");
  const apiKey = "nUk5hG9G5t3Mb9agLiP3gvVCOjU8Pmsx";

  if (!inputText.trim()) {
    responseContainer.textContent = "Por favor, ingresa algún texto.";
    return;
  }

  responseContainer.textContent = "";
  loader.style.display = "block";

  const API_URL = "https://api.mistral.ai/v1/chat/completions";
  const requestBody = {
    model: "mistral-medium",
    messages: [{ role: "user", content: inputText }],
    temperature: 0.7,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error en la API:", data);
      responseContainer.textContent = `Error: ${response.status} - ${
        data.error?.message || "Error desconocido"
      }`;
      return;
    }

    const text = data?.choices?.[0]?.message?.content;
    responseContainer.textContent = text || "No se recibió contenido válido.";
  } catch (error) {
    console.error("Error:", error);
    responseContainer.textContent = "Error al conectar con la API.";
  } finally {
    loader.style.display = "none";
  }
}

async function sendToHuggingFace(inputText) {
  const responseContainer = document.getElementById("responseHuggingFace");
  const loader = document.getElementById("loaderAll");
  const apiKey = "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";

  if (!inputText.trim()) {
    responseContainer.textContent = "Por favor, ingresa algún texto.";
    return;
  }

  responseContainer.textContent = "";
  loader.style.display = "block";

  // Modelo público sin restricciones
  const API_URL = "https://api-inference.huggingface.co/models/gpt2";
  const requestBody = {
    inputs: inputText,
    parameters: { max_new_tokens: 50, temperature: 0.7 },
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    const textResponse = await response.text();
    let data;
    try {
      data = JSON.parse(textResponse);
    } catch {
      responseContainer.textContent = `Error: ${response.status} - ${textResponse}`;
      loader.style.display = "none";
      return;
    }

    if (!response.ok) {
      responseContainer.textContent = `Error: ${response.status} - ${
        data.error || JSON.stringify(data)
      }`;
      return;
    }

    const text =
      data?.[0]?.generated_text ||
      data?.generated_text ||
      "No se recibió contenido válido.";
    responseContainer.textContent = text;
  } catch (error) {
    responseContainer.textContent =
      "Error al conectar con la API de Hugging Face: " + error;
  } finally {
    loader.style.display = "none";
  }
}

async function sendToAll() {
  const inputText = document.getElementById("inputAll").value;
  await Promise.all([
    sendToGemini(inputText),
    sendToMistral(inputText),
    sendToHuggingFace(inputText),
  ]);
}
