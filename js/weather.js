function loadWeather() {
  const app = document.getElementById("app-content");

  app.innerHTML = `
    <h2>🌦️ Weather</h2>

    <input type="text" id="cityInput" placeholder="Enter city name">
    <button id="getWeatherBtn">Get Weather</button>

    <div id="weatherResult" style="margin-top:15px;"></div>
  `;

  document
    .getElementById("getWeatherBtn")
    .addEventListener("click", getWeather);
}

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (city === "") {
    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  resultDiv.innerHTML = "<p>Loading...</p>";

  try {
    // 1️⃣ Get latitude & longitude from city name (NO KEY)
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      resultDiv.innerHTML = "<p>City not found.</p>";
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // 2️⃣ Get weather using lat & lon (NO KEY)
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherRes.json();

    const temp = weatherData.current_weather.temperature;
    const wind = weatherData.current_weather.windspeed;

    resultDiv.innerHTML = `
      <h2>${name}, ${country}</h2>
      <p>🌡️ Temperature: ${temp} °C</p>
      <p>💨 Wind Speed: ${wind} km/h</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = "<p>Error fetching weather data.</p>";
  }
}