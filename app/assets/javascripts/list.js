$( document ).ready(function() {
    var autocomplete, placesList, plainAddress, latLong, service;
    initialize();
});

var initialize = function() {
  // console.log("initializing firing");

  autocomplete = new google.maps.places.Autocomplete(
    /** @type {HTMLInputElement} */(document.getElementById('autocomplete')),
      { types: ['geocode'] });
   
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    plainAddress = autocomplete.getPlace().formatted_address;
      // console.log('Address selected by user: ' + plainAddress);
    
    latLong = autocomplete.getPlace().geometry.location;
      // console.log(latLong);
    
    var request = {
      location: latLong,
      radius: 500,
      keyword: 'coffee shop'
    };

    // console.log(request + " firing");
    placesList = document.getElementById('places');


    var service = new google.maps.places.PlacesService(placesList);
    
    service.nearbySearch(request, callBack);
  });
};

function callBack(results, status) {
  // console.log('callBack FIRING');
  if (status != google.maps.places.PlacesServiceStatus.OK) {
    alert(status);
    return;
  } else {
    console.log(results);
    createListOfCoffeeShops(results);
  }
}

function createListOfCoffeeShops(shops) {
  // console.log('createListOfCoffeeShops FIRING');
  // console.log(shops);
  
  var limit;

  if (shops.length > 10) {
    limit = 10;
  } else {
    limit = shops.length;
    console.log(limit);
  }
  
  for (var i = 0; i < limit; i++) {
    var shop = shops[i];
    placesList.innerHTML += '<li>' + shop.name + '<p>' + shop.vicinity + '</p>' + '</li>';
  }
}
