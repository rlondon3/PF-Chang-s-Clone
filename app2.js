var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([37.41, 8.82]),
    zoom: 4,
  }),
});

window.addEventListener('load', loadPage);
document
  .querySelector('.search-locations')
  .addEventListener('submit', locFinder2);

function loadPage() {
  const addresses = sessionStorage.getItem('output');
  const region = sessionStorage.getItem('output2');
  document.getElementById('loc-results').innerHTML = addresses;
  document.getElementById('region').innerHTML = region;
}
window.onunload = function () {
  sessionStorage.removeItem('key');
  document.getElementById('loc-results').innerHTML = '';
  document.getElementById('region').innerHTML = '';
};

document
  .getElementById('restaurant-search')
  .addEventListener('click', clearFields);

function clearFields(e) {
  document.getElementById('loc-results').innerHTML = '';
  document.getElementById('region').innerHTML = '';
}
document
  .querySelector('.search-locations')
  .addEventListener('submit', locFinder2);

function locFinder2(e) {
  const input2 = document.getElementById('restaurant-search').value;
  const xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    `https://api.openbrewerydb.org/breweries/search?query=${input2}`,
    true
  );
  xhr.onload = function () {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      let output = '';
      let output2 = `"${input2}"`.toUpperCase();
      response.forEach(function (address) {
        output += `
                <div class="row" id="paraPadding">
                <div class= "col-6" id="color">
                <h1 id="alignCenh1">${address.city}</h1>
                <p id="alignCen">CLOSED / OPENS 11AM</p>
                <p id="alignCen">${address.street}</p>
                <p id="alignCen">${address.state}, ${address.city} ${address.postal_code}</p>
                <p id="alignCen">Phone: ${address.phone}</p>
                <a href="#" class="text-white" id="alignCen">GET DIRECTIONS</a>
                <hr id="remove">
                </div>
                <div class="col-6 align-self-end" id="locButtons">
                <a href="menu.html"><button type="button" class="btn btn-danger rounded-0 px-5 mb-1" id="btnMove" style="width: 13em">OUR MENU</button></a>
                <button type="button" class="btn btn-danger rounded-0 px-5 mb-1" id="btnMove" style="width: 13em">ORDER</button>
                <hr>
                </div>
                </div>
                `;
        sessionStorage.setItem('output', output);
        sessionStorage.setItem('output2', output2);
      });

      document.getElementById('loc-results').innerHTML = output;
      document.getElementById('region').innerHTML = output2;
      //COLOR CHANGE ON MOUSE EVENT
      /* const color = document.getElementById("loc-results");
                color.addEventListener("mouseover", function(event) {
                event.target.style.backgroundColor = "grey";
                 }, false);
                color.addEventListener("mouseout", function(event) {
                    event.target.style.backgroundColor = "black";
                }, false) */

      console.log(output2);
    }
  };
  xhr.send();
  e.preventDefault();
}

//OPEN LAYERS ANIMATION CODE
