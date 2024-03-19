// Страница должна содержать:
// заголовок - “Weather app”
// поле для ввода города
// кнопку “Получить погоду”
// область для отображения данных о погоде или ошибки
// При нажатии на кнопку “Получить погоду”, должен отправляться запрос на url, рассмотренный  на предыдущих слайдах
// Во время ожидания ответа нужно отображать индикатор
// После успешного получения данных, их нужно отобразить на странице (температуру и название города).
// Задача со * - отобразить иконку погоды из ответа
// При получении ошибки, её данные нужно отобразить на странице (код и сообщение)
// При отсутствии названия города, после нажатия на кнопку “Получить погоду” должен появиться alert с просьбой ввести название города
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// 20d33ac6be5445d5fdd881c509384a9d

const getWeatherButton = document.querySelector(".request-button");
const forecastContainer = document.querySelector(".weather-container");
const cityName = document.querySelector(".city-input");
const apiKey = "20d33ac6be5445d5fdd881c509384a9d";

const getWeatherData = async () => {
  try {
     if (cityName.value === "") {
        alert("Please enter the required city");
        return;
      }
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}`,
      {
        method: "GET",
      }
    );
    const result = await response.json();
    console.log(result);
    if (!response.ok) {
      throw Object.assign(
        new Error((forecastContainer.textContent = displayError(result))));
    } else {
      forecastContainer.textContent = displayForecast(result);
      forecastContainer.append(displayWeatherIcon(result));
    }
  } catch (error) {
    console.log(error);
    forecastContainer.textContent = error.message;
  }
};

const displayWeatherIcon = result => {
  const iconImg = document.createElement("img");
  iconImg.src = `http://openweathermap.org/img/w/${result.weather[0].icon}.png`;
  iconImg.style.margin = "10px";
  return iconImg;
}

const displayForecast = result => {
  const convertInCelcius = Math.round(result.main.temp - 273.15);
  const ourWeather = `Weather in ${result.name}: ${convertInCelcius} °C`;
  forecastContainer.style.backgroundColor = "#ffffffb1";
  forecastContainer.style.fontSize = "18px";
  forecastContainer.style.color = '#191935';
  forecastContainer.style.paddingLeft = '10px';
  return ourWeather;
}

const displayError = result => {
  const errorText = `Error: ${result.cod} - ${result.message}`;
  forecastContainer.style.backgroundColor = "#ffffffb1";
  forecastContainer.style.fontSize = "22px";
  forecastContainer.style.color = '#dd0808'
  return errorText;
}

getWeatherButton.addEventListener("click", getWeatherData);

// Примечания:
// 1. Функции по обработке результата и ошибки (корректировку данных и отображение на странице) лучше выносить в отдельные функции
// 2. Для удаления пробелов в городах, содержащих в названии несколько слов можно использовать метод trim()
// 3. APP_ID лучше вынести в отдельную переменную и уже её передавать в url
// 4. Температуру необходимо перевести в градусы (от вервера приходит температура в Кельвинах)
// 5. Для отображения иконки, необходимо вставить соответствующую иконку в url атрибута src - http://openweathermap.org/img/w/${icon}.png
