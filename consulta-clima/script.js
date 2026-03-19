let apiKey = "d6f8eb872566233455a06a9dea908961";

async function buscarClima() {

let cidade = encodeURIComponent(document.getElementById("cidade").value.trim());

if (!cidade) {
document.getElementById("resultado").innerHTML = "Digite uma cidade!";
return;
}

let url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

buscarDados(url);

}

async function buscarLocalizacao(){

navigator.geolocation.getCurrentPosition(async posicao => {

let lat = posicao.coords.latitude;
let lon = posicao.coords.longitude;

let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;

buscarDados(url);

});

}

async function buscarDados(url){

document.getElementById("resultado").innerHTML = "Carregando...";

try{

let resposta = await fetch(url);

if(!resposta.ok){
throw new Error("Erro na API");
}

let dados = await resposta.json();

let icone = dados.weather[0].icon;
let urlIcone = `https://openweathermap.org/img/wn/${icone}@2x.png`;

let nascerSol = new Date(dados.sys.sunrise * 1000).toLocaleTimeString();
let porSol = new Date(dados.sys.sunset * 1000).toLocaleTimeString();

alterarFundo(dados.weather[0].main);

document.getElementById("resultado").innerHTML = `

<h2>${dados.name}, ${dados.sys.country}</h2>

<img src="${urlIcone}">

<p>🌡 Temperatura: ${dados.main.temp}°C</p>
<p>🥶 Min: ${dados.main.temp_min}°C | 🔥 Max: ${dados.main.temp_max}°C</p>

<p>🥵 Sensação térmica: ${dados.main.feels_like}°C</p>

<p>☁ Clima: ${dados.weather[0].description}</p>

<p>💧 Umidade: ${dados.main.humidity}%</p>

<p>🌬 Vento: ${dados.wind.speed} m/s</p>

<p>🌅 Nascer do sol: ${nascerSol}</p>
<p>🌇 Pôr do sol: ${porSol}</p>

`;

}

catch{

document.getElementById("resultado").innerHTML =
"Não foi possível buscar o clima.";

}

}

function alterarFundo(clima){

let body = document.body;

if(clima === "Clear"){
body.style.background = "linear-gradient(135deg,#fceabb,#f8b500)";
}

else if(clima === "Clouds"){
body.style.background = "linear-gradient(135deg,#bdc3c7,#2c3e50)";
}

else if(clima === "Rain" || clima === "Drizzle"){
body.style.background = "linear-gradient(135deg,#4b79a1,#283e51)";
}

else if(clima === "Snow"){
body.style.background = "linear-gradient(135deg,#e6dada,#274046)";
}

else if(clima === "Thunderstorm"){
body.style.background = "linear-gradient(135deg,#141e30,#243b55)";
}

else{
body.style.background = "linear-gradient(135deg,#74ebd5,#ACB6E5)";
}

}