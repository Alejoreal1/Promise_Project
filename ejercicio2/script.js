// === Función para Gemini ===
async function sendToGemini() {
    const inputText = document.getElementById('inputGemini').value;
    const responseContainer = document.getElementById('responseGemini');
    const loader = document.getElementById('loaderGemini');
    const apiKey = "AIzaSyDs-mJ6UWyvcac3yuTOt7mYFjodxzTMekw";

    if (!inputText.trim()) {
        responseContainer.textContent = "Por favor, ingresa algún texto.";
        return;
    }

    responseContainer.textContent = "";
    loader.style.display = 'block';

    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const requestBody = {
        "contents": [{ "parts": [{ "text": inputText }] }]
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        loader.style.display = 'none';

        const data = await response.json();

        if (!response.ok) {
            console.error("Error en la API:", data);
            responseContainer.textContent = `Error: ${response.status} - ${data.error?.message || 'Error desconocido'}`;
            return;
        }

        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        responseContainer.textContent = text || "No se recibió contenido válido.";

    } catch (error) {
        loader.style.display = 'none';
        console.error("Error:", error);
        responseContainer.textContent = "Error al conectar con la API.";
    }
}

// === Función para Mistral ===
async function sendToMistral() {
    const inputText = document.getElementById('inputMistral').value;
    const responseContainer = document.getElementById('responseMistral');
    const loader = document.getElementById('loaderMistral');
    const apiKey = "nUk5hG9G5t3Mb9agLiP3gvVCOjU8Pmsx"; // Reemplaza con tu clave real

    if (!inputText.trim()) {
        responseContainer.textContent = "Por favor, ingresa algún texto.";
        return;
    }

    responseContainer.textContent = "";
    loader.style.display = 'block';

    const API_URL = "https://api.mistral.ai/v1/chat/completions"; // Verifica si este endpoint es correcto para tu proveedor
    const requestBody = {
        model: "mistral-medium", // O el modelo que uses
        messages: [{ role: "user", content: inputText }],
        temperature: 0.7
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        loader.style.display = 'none';

        const data = await response.json();

        if (!response.ok) {
            console.error("Error en la API:", data);
            responseContainer.textContent = `Error: ${response.status} - ${data.error?.message || 'Error desconocido'}`;
            return;
        }

        const text = data?.choices?.[0]?.message?.content;
        responseContainer.textContent = text || "No se recibió contenido válido.";

    } catch (error) {
        loader.style.display = 'none';
        console.error("Error:", error);
        responseContainer.textContent = "Error al conectar con la API.";
    }
}

// === Función para DeepSeek ===
async function sendToDeepSeek() {
    const inputText = document.getElementById('inputDeepSeek').value;
    const responseContainer = document.getElementById('responseDeepSeek');
    const loader = document.getElementById('loaderDeepSeek');
    const apiKey = "sk-4fb7d531ac2147d7b77827b4f4e38fbf"; // Reemplaza con tu clave real

    if (!inputText.trim()) {
        responseContainer.textContent = "Por favor, ingresa algún texto.";
        return;
    }

    responseContainer.textContent = "";
    loader.style.display = 'block';

    const API_URL = "https://api.deepseek.com/v1/chat/completions"; // Verifica si este endpoint es correcto
    const requestBody = {
        model: "deepseek-chat", // Ajusta si usas otro modelo
        messages: [{ role: "user", content: inputText }],
        temperature: 0.7
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        loader.style.display = 'none';

        const data = await response.json();

        if (!response.ok) {
            console.error("Error en la API:", data);
            responseContainer.textContent = `Error: ${response.status} - ${data.error?.message || 'Error desconocido'}`;
            return;
        }

        const text = data?.choices?.[0]?.message?.content;
        responseContainer.textContent = text || "No se recibió contenido válido.";

    } catch (error) {
        loader.style.display = 'none';
        console.error("Error:", error);
        responseContainer.textContent = "Error al conectar con la API.";
    }
}
