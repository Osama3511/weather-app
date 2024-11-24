const API = "KAFEUMVCB58NWZCSXK4NYTYTC"; // just a free api key from visual crossing no need to hide it

function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
}

async function getWeather(city) {
  const date = getCurrentDate();
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${date}?key=${API}
      `,
      { mode: "cors" }
    );

    const json = await response.json();
    console.log(json);
    return json;
  } catch (err) {
    console.log(err);
  }
}

async function Weather(city) {
  const currentWeather = await getWeather(city);

  const feelsLike = currentWeather.days[0].feelslike;
  const getFeelsLike = () => feelsLike;

  const temp = currentWeather.days[0].temp;
  const getTemp = () => temp;

  const description = currentWeather.days[0].description;
  const getDescription = () => description;

  const location = currentWeather.resolvedAddress;
  const getLocation = () => location;

  return {
    getLocation,
    getFeelsLike,
    getTemp,
    getDescription,
  };
}

function screenController() {
  async function updateScreen() {
    const city = document.querySelector("#search").value;
    const weather = await Weather(city);

    const container = document.querySelector(".container");
    container.textContent = "";

    const card = document.createElement("div");
    const location = document.createElement("p");
    const feelsLike = document.createElement("p");
    const temp = document.createElement("p");
    const description = document.createElement("p");

    location.textContent = weather.getLocation();
    feelsLike.textContent = weather.getFeelsLike();
    temp.textContent = weather.getTemp();
    description.textContent = weather.getDescription();

    card.classList.add("card");

    card.appendChild(location);
    card.appendChild(description);
    card.appendChild(temp);
    card.appendChild(feelsLike);

    container.appendChild(card);
  }

  const searchBtn = document.querySelector(".search-btn");

  searchBtn.addEventListener("click", updateScreen);
}

screenController();

