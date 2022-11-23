
let map

function init() {
    renderMap()
}


function renderMap() {

  map = new google.maps.Map(
    document.querySelector('#map'),
    {
      zoom: 11,
      center: { lat: 40.36937770716708, lng: -3.723861852483895 }
    }
  )
}
