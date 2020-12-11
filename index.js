// document.getElementById('map-link').disabled = true;

document.getElementById("map-link").addEventListener('click', function () {
  if (document.getElementById("location").innerHTML == ""){
    alert("there is no a location to show")
  }
});

document.getElementById("check").addEventListener('click', function () {
  var data = document.getElementById("country").value;
  if (data !== "") {
    var fetchURL = `http://api.openweathermap.org/data/2.5/weather?q=${data}&units=metric&appid=1805b28a26785843f83816dbb1f2164b`;
  fetch(fetchURL)
    .then(response => response.json())
    .then(json => {
      document.getElementById("name").innerHTML = data + " temperature is : " + json.main.temp + "°C" ;
      document.getElementById("ggg").src = `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
    })
    .catch((error) => {
      alert("error: make sure that you have not entered the country name wrongly ");
    });
  }else{
    alert("the search field is empty")
  }
  
});

document.getElementById("find-me").addEventListener('click', function () {
  geoFindMe();
});
function geoFindMe() {

  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');

  mapLink.href = '';
  // mapLink.textContent = '';

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = '';
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    //   mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    mapLink.textContent = "Map Location";
    var link = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=1805b28a26785843f83816dbb1f2164b`;
    fetch(link)
      .then(response => response.json())

      .then(json => {
        // document.getElementById("map-button").disabled = false;
        document.getElementById("location").innerHTML = "the temperature of your current location is: " + json.main.temp + " °C";
        document.getElementById("ccc").src = `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
      });
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if (!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }

}

// document.querySelector('#find-me').addEventListener('click', geoFindMe);

