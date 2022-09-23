$.when($.ready).then(function () {
  const dictAmenitiesId = {};
  let listNameAmenities = [];
  let listIdAmenities = [];
  $('[type="checkbox"]').click(function () {
    const name = $(this).attr('data-name');
    const id = $(this).attr('data-id');
    if ($(this).is(':checked')) {
      dictAmenitiesId[id] = name;
    } else {
      delete dictAmenitiesId[id];
    }
    listNameAmenities = [];
    listIdAmenities = [];
    for (const [key, value] of Object.entries(dictAmenitiesId)) {
      listNameAmenities.push(value);
      listIdAmenities.push(key);
    }
    $('.amenities h4').text(listNameAmenities.join(', '));
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (typeof data === 'object' && data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  $('button').click(function () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      data: JSON.stringify({ states: [], cities: [], amenities: listIdAmenities }),
      headers: { 'Content-Type': 'application/json' },
      dataType: 'json',
      success: function (response) {
        $('article').remove();
        for (let i = 0; i < response.length; i++) {
          $('.places').append('<article></article>');
          $('article:last').append('<div></div>');
          $('article:last div').addClass('title_box');
          $('.title_box:last').append('<h2>' + response[i].name + '</h2>');
          $('.title_box:last').append('<div></div>');
          $('.title_box:last div').addClass('price_by_night');
          $('.price_by_night:last').append('$' + response[i].price_by_night);
          $('article:last').append('<div></div>');
          $('article:last div:last').addClass('information');
          $('.information:last').append('<div></div>');
          $('.information:last div').addClass('max_guest');
          $('.max_guest:last').append(response[i].max_guest + ' Guest');
          $('.information:last').append('<div></div>');
          $('.information:last div:last').addClass('number_rooms');
          $('.number_rooms:last').append(response[i].number_rooms + ' Bedroom');
          $('.information:last').append('<div></div>');
          $('.information:last div:last').addClass('number_bathrooms');
          $('.number_bathrooms:last').append(response[i].number_bathrooms + ' Bathroom');
          $('article:last').append('<div></div>');
          $('article:last div:last').addClass('description');
          $('.description:last').append(response[i].description);
        }
      }
    });
  });
});
