const apiKey = "ТВОЙ_API_КЛЮЧ"; // 🔥 вставь сюда свой ключ из openweathermap.org
const searchInput = document.querySelector(".search-bar input");
const locationSpan = document.querySelector(".location span");
const tempValue = document.querySelector(".left h1");
const weatherText = document.querySelector(".right h3");
const feelsLike = document.querySelector(".right p");
const dateElement = document.querySelector(".date");
const dayElement = document.querySelector(".left h2");

async function getWeather(city) {
  try {
    // Отправляем запрос к API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      alert("Город не найден 😢");
      return;
    }

    // Обновляем город
    locationSpan.textContent = data.name;

    // Температура
    const temperature = Math.round(data.main.temp);
    tempValue.textContent = `${temperature}°C`;

    // Описание погоды
    const weather = data.weather[0].main;
    weatherText.textContent = weather;
    feelsLike.textContent = `Feels like ${Math.round(data.main.feels_like)}°`;

    // Дата и день недели
    const now = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-GB', options);
    const [weekday, datePart] = formattedDate.split(',');

    dayElement.textContent = weekday.charAt(0).toUpperCase() + weekday.slice(1);
    dateElement.textContent = datePart.trim();

  } catch (error) {
    console.error("Ошибка получения данных:", error);
    alert("Не удалось получить данные о погоде 😔");
  }
}

// Когда пользователь нажимает Enter в поле ввода
searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    const city = searchInput.value.trim();
    if (city !== "") {
      getWeather(city);
    }
  }
});
