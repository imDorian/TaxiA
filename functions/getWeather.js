async function getWeather() {
  const response = await fetch();
  const data = await response.json();
  return data;
}

export default getWeather;
