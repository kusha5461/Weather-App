const apiKey = "6dae40a10e2f406cc066efc3e2011c6e";

const weatherDataEle = document.querySelector(".weather-data");
const cityName = document.querySelector("#City-Name");
const formEle = document.querySelector("form");
const iconEle = document.querySelector(".icon");

formEle.addEventListener("submit", (e) => {
    e.preventDefault();
    const cityValue = cityName.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        const temperature = Math.floor(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        const details = [
            `Feels Like: ${Math.floor(data.main.feels_like)} °C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`
        ];

        weatherDataEle.querySelector(".temp").textContent = `${temperature}°C`;
        weatherDataEle.querySelector(".desc").textContent = description;
        iconEle.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="weather icon">`;
        weatherDataEle.querySelector(".details").innerHTML = details
            .map(detail => `<div>${detail}</div>`)
            .join("");

    } catch (err) {
        console.error("Error:", err.message);
    }
}


