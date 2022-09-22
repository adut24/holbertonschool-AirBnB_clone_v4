$.when($.ready).then(function () {
  dictAmenitiesId = {}
  console.log("hello")
  $('[type="checkbox"]').click(function () {
    console.log("click!");
    const name = $(this).attr('data-name');
    const id = $(this).attr('data-id');
    if ($(this).is(':checked')) {
      dictAmenitiesId[id] = name;
    } else {
      delete dictAmenitiesId[id];
    }
    listNameAmenities = [];
    for (const [key, value] of Object.entries(dictAmenitiesId)) {
      listNameAmenities.push(value);
    }
    $('.amenities h4').text(listNameAmenities.join(', '));
  });
});
