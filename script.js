document.addEventListener('DOMContentLoaded', () => {
    const getWeatherButton = document.getElementById('getWeatherButton');
    const locationInput = document.getElementById('locationInput');
    const weatherInfo = document.getElementById('weatherInfo');

    getWeatherButton.addEventListener('click', () => {
        const location = locationInput.value;
        if (location) {
            fetchWeatherData(location);
        } else {
            alert('Please enter a location.');
        }
    });

    function fetchWeatherData(location) {
        const apiKey = 'a6f22cdbd8009bbdcb36a9157f89a89b';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => displayWeatherData(data))
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherInfo.innerHTML = 'Error fetching weather data. Please try again.';
            });
    }

    function displayWeatherData(data) {
        if (data.cod === 200) {
            const { name, main, weather } = data;
            weatherInfo.innerHTML = `
                <h2>${name}</h2>
                <p>${weather[0].description}</p>
                <p>Temperature: ${main.temp}°C</p>
                <p>Humidity: ${main.humidity}%</p>
                <p>Pressure: ${main.pressure} hPa</p>
            `;
        } else {
            weatherInfo.innerHTML = 'Location not found. Please try again.';
        }
    }
});