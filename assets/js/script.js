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
      let apiUrl = `${WEATHER_API_BASE_URL}/data/2.5/onecall?lat=${myData.lat}&lon=${mydata.lon}&units=imperial&exclude=minutely,hourly&units=imperial&appid=f23ee9deb4e1a7450f3157c44ed020e1"`;
    });
};
