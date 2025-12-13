const cityName = document.querySelector("#city");
const btn = document.querySelector("#searchBtn");
const box = document.querySelector("#box");
const boxMsg = document.querySelector("#boxMsg");
const weatherData = document.querySelector("#weatherData");
const disCity = document.querySelector("#disCity");
const disTemp = document.querySelector("#disTemp");
const disHum = document.querySelector("#disHum");
const disIcon = document.querySelector("#disIcon");
const disLine = document.querySelector("#disLine");

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "54ba27020a73b37672c2a775d6b2a628";

window.onload = () => {
    cityName.value = "";
    boxMsg.innerText = "Please enter a city name!";
    boxMsg.style.display = "flex";
    weatherData.style.display = "none";
};

btn.onclick = async () => {
    const city = cityName.value;

    if (city === "") {
        boxMsg.innerText = "Please enter a city name!";
        boxMsg.style.display = "flex";
        weatherData.style.display = "none";
        return;
    }

    else{
        const url = `${baseUrl}?q=${city}&units=metric&appid=${apiKey}`;

        let promise = await fetch(url);
        let data = await promise.json();
        console.log(data);

        if (data.cod !== 200) {
            boxMsg.innerText = "City not found!";
            boxMsg.style.color = "red";
            boxMsg.style.display = "flex";
            weatherData.style.display = "none";
            return;
        }

        boxMsg.style.display = "none";
        weatherData.style.display = "flex";

        disCity.innerText = data.name;
        disTemp.innerHTML = `${Math.round(data.main.temp)}<sup>°C</sup>`;
        disHum.innerText = `${data.wind.speed} km/h`;
        disLine.innerText = data.weather[0].description;

        const iconCode = data.weather[0].icon;
        disIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    }
}