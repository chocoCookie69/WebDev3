document.getElementById("searchBtn").addEventListener("click", ()=>
	{
		let searchTerm = document.getElementById("searchInput").value;
		if(searchTerm)
			searchWeather(searchTerm);
	}
)

let appid = '3653a1f82b2f9a0e512e5639001784a2';
let units = 'imperial';
let searchMethod;

function searchWeather(searchTerm)
{
	getSearchMethod(searchTerm);
	fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appid}&units=${units}`).then(result =>{
		return result.json();
	}).then(result=>{
		init(result);
	})
}
function getSearchMethod(searchTerm)
{
	if((searchTerm.length === 6 )&& Number.parseInt(searchTerm) + '' === searchTerm)
		searchMethod = 'zip';
	else
		searchMethod = 'q';
}
function setPositionForWeatherinfo()
	{
		document.getElementById("weatherContainer");
		let weatherContainerHeight = weatherContainer.clientHeight;
		let weatherContainerWidth = weatherContainer.clientWidth;
		weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
		weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.2}px)`;
		weatherContainer.style.visibility = 'visible';
		
	}
function init(resultFromServer)
{
	console.log(resultFromServer);
	switch(resultFromServer.weather[0].main)
	{
		case 'Clear':
			document.body.style.backgroundImage = 'url("clear.jpg")';
			break;
		
		case 'Clouds':
			document.body.style.backgroundImage = 'url("cloudy.jpg")';
			break;
		
		case 'Mist':
		case 'Drizzle':
		case 'Rain':
			document.body.style.backgroundImage = 'url("rain.jpg")';
			break;
		
		case 'Thunderstorm':
			document.body.style.backgroundImage = 'url("thunderstorm.jpg")';
			break;
		
		case 'Snow':
			document.body.style.backgroundImage = 'url("snow.jpg")';
			break;
		
		default: break;
	}
	
	let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
	let temperatureElemet = document.getElementById('temperature');
	let humidityElement = document.getElementById('humidity');
	let windSpeedElement = document.getElementById('windspeed');
	let cityHeader = document.getElementById('cityHeader');
	let weatherIcon = document.getElementById('documentIcon');
	
	weatherIcon.src = "http://openweathermap.org/img/wn/" + resultFromServer.weather[0].icon + ".png";
	
	let resultDescription = resultFromServer.weather[0].description;
	weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase()+ resultDescription.slice(1);
	
	temperatureElemet.innerHTML = Math.floor(resultFromServer.main.temp) + "&#176" + "F";
	windSpeedElement.innerHTML = "Winds at : "+ Math.floor(resultFromServer.wind.speed)+"m/s";
	cityHeader.innerHTML = resultFromServer.name;
	humidityElement.innerHTML = "Humidity levels at "+ resultFromServer.main.humidity+ "%";

	setPositionForWeatherinfo();
}
