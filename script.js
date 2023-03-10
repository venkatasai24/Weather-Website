// script.js
const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const weatherDetails = document.getElementById("weather-details");
const card = document.getElementById("card");

// Attach an event listener to the search form
searchForm.addEventListener("submit", function(event) {
  event.preventDefault(); // prevent the default form submission behavior

  const city = cityInput.value;
  const apiKey = API_KEY; // Replace this with your API key

  // Construct the API URL using the city and API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // Send an AJAX request to the API endpoint
  const xhr = new XMLHttpRequest();
  xhr.open("GET", apiUrl);

  xhr.onload = function() {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      const query=response.name+" , "+response.sys.country;
      const temperature = response.main.temp;
      const description = response.weather[0].description;
      const humidity = response.main.humidity;
      const imageUrl="http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
      // Display the weather details in the UI
      card.classList.add("details");
      weatherDetails.style.backgroundColor="rgb(127 238 195)";
      weatherDetails.style.margin="1.5vh auto";
      weatherDetails.style.padding="2vh";
      weatherDetails.innerHTML = `
        <img style='height:15vh;width:15vh;' src=${imageUrl}>
        <p style='font-size:5vh'>${temperature}<span>&#176;</span>C</p>
        <h2><img src='images/images.jpeg'>  ${query}</h2>
        <p><img src='images/temp.png'> Feels like ${description}</p>
        <p> <img src='images/humidity.png'> Humidity ${humidity}% </p>
        `;
    } else {
      // Display an error message in the UI
      card.classList.remove("details");
      weatherDetails.style.padding="2vh";
      weatherDetails.style.margin="1.5vh auto";
      weatherDetails.style.backgroundColor="#FFCCCB";
      weatherDetails.innerHTML = `
        <p>Enter correct cityName!!</p>
      `;
    }
  };

  xhr.send(); // Send the AJAX request
});
