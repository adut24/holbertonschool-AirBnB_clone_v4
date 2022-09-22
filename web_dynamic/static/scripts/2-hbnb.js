$.when($.ready).then(function () {
  const dictAmenitiesId = {};
  $('[type="checkbox"]').click(function () {
    const name = $(this).attr('data-name');
    const id = $(this).attr('data-id');
    if ($(this).is(':checked')) {
      dictAmenitiesId[id] = name;
    } else {
      delete dictAmenitiesId[id];
    }
    const listNameAmenities = [];
    for (const [, value] of Object.entries(dictAmenitiesId)) {
      listNameAmenities.push(value);
    }
    $('.amenities h4').text(listNameAmenities.join(', '));
  });
  $.get('http://localhost:5001/api/v1/status/', function (data) {
    if (typeof data !== 'object') {
      $('#api_status').removeClass('available');
    } else {
      $('#api_status').addClass('available');
    }
  });
});
