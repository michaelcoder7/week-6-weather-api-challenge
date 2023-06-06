const WEATHER_API_BASE_URL = "https://api.openweathermap.org";
const WEATHER_API_KEY = "f23ee9deb4e1a7450f3157c44ed020e1";
const MAX_DAILY_FORECAST = 5;

const recentLocations = [];

const getLocation = () => {
  // gets location entered by user
  const userLocation = locationInput.value;

  // verifies its valid, if so, looks up location
  if (userLocation === "") {
    setLocationError("Please enter a location");
  } else {
    lookupLocation(userLocation);
  }
};

// clears the last error on the page
const clearError = () => {
  const errorDisplay = document.getElementById("error");
  errorDisplay.textContent = "";
};

// displays an error
const setLocationError = (text) => {
  const errorDisplay = document.getElementById("error");
  errorDisplay.textContent = text;

  // set a timer to clear it after 3 seconds
  setTimeout(clearError, 3000);
};

const lookupLocation = (search) => {
  // Lookup the location to get the Lat/Lon
  let apiUrl = `${WEATHER_API_BASE_URL}/geo/1.0/direct?q=${search}&limit=5&appid=${WEATHER_API_KEY}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      //picks the first location from the results
      //const location = data[0];
      let lat = data[0].lat;
      let lon = data[0].lon;

      const myData = {
        name: data[0].name,
        country: data[0].country,
        lat: data[0].lat,
        lon: data[0].lon,
      };

      console.log(myData);

      //gets the Weather for the cached location
      let apiUrl = `${WEATHER_API_BASE_URL}/data/2.5/onecall?lat=${myData.lat}&lon=${mydata.lon}&units=imperial&exclude=minutely,hourly&units=imperial&appid=f23ee9deb4e1a7450f3157c44ed020e1`;
      console.log(apiUrl);
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          // show the current weather forecast
          displayCurrentWeather(data);

          // show the 5 day weather forecast
          displayWeatherForecast(data);
        });

      //display the weather
      displayWeather(myData);
    });
};

const displayCurrentWeather = (weatherData) => {
  const currentWeather = weatherData.current;

  // display the current weather at the top of the dashboard
  document.getElementById("temp_value").textcontent = `${currentWeather.temp}*`;
  document.getElementById(
    "wind_value"
  ).textcontent = `${currentWeather.wind_speed}MPH`;
  document.getElementById(
    "humid_value"
  ).textcontent = `${currentWeather.humidity}%`;
  document.getElementById("uvi_value").textcontent = `${currentWeather.uvi}`;
};

const displayWeatherForecast = (weatherData) => {
  // gets the daily forecasts
  const dailyData = weatherData.daily;

  // show the forecast section
  document.getElementById("forecast").style.display = "block";

  // clear any current forecasts
  const forecastList = document.getElementById("forecast-days");
  forecastList.innerHTML = "";

  // adds the new forecasts so they are displayed
  for (let i = 0; i < MAX_DAILY_FORECAST; i++) {
    const dailyForecast = dailyData[i];
    const day = new Date(dailyForecast.dt * 1000).toLocaleDateString("en-GB", {
      weekday: "long",
    });
    const temp = `${dailyForecast.temp.day}*`;
    const humidity = `${dailyForecast.humidity}%`;
    const wind = `${dailyForecast.wind_speed}MPH`;

    const newForecast = document.createElement("div");
    newForecast.classList.add("forecast-day");
    newForecast.innerHTML = `<div class="weather-info">
            <div class="date">
                 <span>${day}</span>
            </div>
            <div class="temperature">
                <span>${temp}</span>
            </div>
            <div class="wind">
                <span>${wind}</span>
            </div>
            <div class="humidity">
                <span>${humidity}</span>
            </div>
        </div>`;
    forecastList.appendChild(newForecast);
  }
};

const getWeather = (lat, lon) => {
  // gets the weather for the cached location
  let apiUrl = `${WEATHER_API_BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&units=imperial&appid=f23ee9deb4e1a7450f3157c44ed020e1`;
  console.log(apiUrl);
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      // show the current weather forecast
      displayCurrentWeather(data);

      //show the 5 day weather forecast
      displayWeatherForecast(data);
    });
};

// Display the weather for the cached location
const displayWeather = (weatherdata) => {
  document.getElementById(
    "location-name"
  ).textContent = `${weatherData.name}, ${weatherData.country}`;

  getWeather(weatherData.lat, weatherData.lon);
};

// search text and search button
const locationInput = document.getElementById("location");
const searchButton = document.getElementById("search");

searchButton.addEventListener("click", getLocation);
