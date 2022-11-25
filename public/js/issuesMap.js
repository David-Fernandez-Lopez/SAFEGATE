

let map

let marker=[]

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
      
      marker.push( new google.maps.Marker({
        map,
        position: { lat, lng },
        title: `${elm.agression}, Descripción: ${elm.description}`,
        animation: google.maps.Animation.DROP
      }))
    }) 
  }
  
  function renderMap() {
    
    map = new google.maps.Map(
      document.querySelector('#map'),
      {
        zoom: 13,
        center: { lat: 40.392454906025985, lng: -3.6972145868784514 }
      }
      )
}
  
//  const markerCluster = new MarkerClusterer({ map, marker })
    