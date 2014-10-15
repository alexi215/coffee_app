$( document ).ready(function() {
    var autocomplete, placesList, plainAddress, latLong, service;
    initialize();
});

var initialize = function() {
  autocomplete = new google.maps.places.Autocomplete(
    /** @type {HTMLInputElement} */(document.getElementById('autocomplete')),
      { types: ['geocode'] });
   
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    plainAddress = autocomplete.getPlace().formatted_address;
    latLong = autocomplete.getPlace().geometry.location;
    
    var request = {
      location: latLong,
      radius: 5000,
      keyword: 'coffee shop'
    };

    placesList = document.getElementById('places');
    var service = new google.maps.places.PlacesService(placesList);
    service.nearbySearch(request, callBack);
  });
};

function callBack(results, status) {
  if (status != google.maps.places.PlacesServiceStatus.OK) {
    alert(status);
    return;
  } else {
    createListOfCoffeeShops(results);
  }
}

function createListOfCoffeeShops(shops) {
  var limit;

  if (shops.length > 10) {
    limit = 10;
  } else {
    limit = shops.length;
  }
  
  for (var i = 0; i < limit; i++) {
    var shop = shops[i];
    placesList.innerHTML += '<li>' + shop.name + '<p>' + shop.vicinity + '</p>' + '</li>';
  }
}
