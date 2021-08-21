document
  .querySelector('.search-locations')
  .addEventListener('submit', locFinder2);

function locFinder2(e) {
  const input2 = document.getElementById('restaurant-search').value;
  let count = 0;
  //Create XHR
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
      window.location = 'location2.html';
    }
  };
  xhr.send();
  e.preventDefault();
}
/* const color = document.getElementById('color');
color.addEventListener('mouseenter', function (e) {
  e.target.style.backgroundColor = 'yellow';
}); */
