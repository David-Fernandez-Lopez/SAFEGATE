
let map

function init() {
  renderMap()
  getIssues()
}


function getIssues() {

  axios
    .get('/api/json')
    .then(response => setMarkers(response.data))
    .catch(err => console.log(err))
}


function setMarkers(issue) {

  issue.forEach(elm => {

    const lat = elm.location.coordinates[1]
    const lng = elm.location.coordinates[0]

    const marker = new google.maps.Marker({
        map,
        position: { lat, lng },
        title: `${elm.agression}, Descripción: ${elm.description}`,
        animation: google.maps.Animation.DROP
    })
})
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
