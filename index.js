const API = "KAFEUMVCB58NWZCSXK4NYTYTC"; // just a free api key from visual crossing no need to hide it

const city = "london";

function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
}

async function getWeather() {
  const date = getCurrentDate();
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${date}?key=${API}
      `,
      { mode: "cors" }
    );

    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
  }
}

async function Weather() {
  const currentWeather = await getWeather();

  const feelsLike = currentWeather.days[0].feelslike;
  const getFeelsLike = () => feelsLike;


  const temp = currentWeather.days[0].temp;
  const getTemp = () => temp;

  const description = currentWeather.days[0].description;
  const getDescription = () => description;

  return {
    getFeelsLike,
    getTemp,
    getDescription,
  };
}

async function main() {
  const weather = await Weather();
  console.log(weather.getDescription());
}

main();

