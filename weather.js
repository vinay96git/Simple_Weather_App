const apiKey = "9b04b8f9a974f7940303dc6e2d4c7106";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const locationBtn = document.querySelector(".location");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {

        var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "icons/clouds.png";
    } 
    else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "icons/clear.png";
    } 
    else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "icons/rain.png";
    } 
    else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "icons/drizzle.png";
    } 
    else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "icons/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})

// Function to get weather based on current location
locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Fetch weather using latitude and longitude
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    document.querySelector(".city").innerHTML = data.name;
                    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
                    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
                    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

                    if (data.weather[0].main == "Clouds") {
                        weatherIcon.src = "icons/clouds.png";
                    } else if (data.weather[0].main == "Clear") {
                        weatherIcon.src = "icons/clear.png";
                    } else if (data.weather[0].main == "Rain") {
                        weatherIcon.src = "icons/rain.png";
                    } else if (data.weather[0].main == "Drizzle") {
                        weatherIcon.src = "icons/drizzle.png";
                    } else if (data.weather[0].main == "Mist") {
                        weatherIcon.src = "icons/mist.png";
                    }

                    document.querySelector(".weather").style.display = "block";
                    document.querySelector(".error").style.display = "none";
                })
                .catch(() => {
                    document.querySelector(".error").style.display = "block";
                    document.querySelector(".weather").style.display = "none";
                });
        }, () => {
            alert("Location request denied. Please allow location access and try again.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});