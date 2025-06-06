  // APIs del clima para Medellín
const urls = [
  'https://api.open-meteo.com/v1/forecast?latitude=6.25184&longitude=-75.56359&current_weather=true',
  'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=6.25184&lon=75.56359'
];

// Funciones para consultar y formatear la respuesta
function fetchOpenMeteo() {
  return fetch(urls[0])
    .then(res => res.json())
    .then(data => ({
      fuente: 'Open-Meteo',
      temperatura: data.current_weather.temperature,
      viento: data.current_weather.windspeed,
      unidad: '°C'
    }));
}

function fetchMetNorway() {
  return fetch(urls[1], {
    headers: {
      'User-Agent': 'clima-app-web' // Algunos navegadores podrían ignorar esto
    }
  })
    .then(res => res.json())
    .then(data => {
      const instant = data.properties.timeseries[0].data.instant.details;
      return {
        fuente: 'MET Norway',
        temperatura: instant.air_temperature,
        viento: instant.wind_speed,
        unidad: '°C'
      };
    });
}

// Mostrar el resultado en el DOM
document.addEventListener('DOMContentLoaded', () => {
  Promise.race([fetchOpenMeteo(), fetchMetNorway()])
    .then(clima => {
      document.getElementById('fuente').textContent = `🌐 Fuente: ${clima.fuente}`;
      document.getElementById('temperatura').textContent = `🌡️ Temperatura: ${clima.temperatura} ${clima.unidad}`;
      document.getElementById('viento').textContent = `💨 Viento: ${clima.viento} km/h`;
    })
    .catch(error => {
      document.querySelector('.weather-info').innerHTML = `<p style="color:red;">❌ Error al obtener el clima.</p>`;
      console.error('Error al consultar el clima:', error);
    });
});
