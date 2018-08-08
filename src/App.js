import React, {Component} from 'react';
import VolcanList from './VolcanList';
import * as volcanoes from './volcanoes.json';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      map: '',
      markers: [],
      island: volcanoes,
      infoWindow: false,
      contenu: ''
    }
  }
  componentDidMount() {
    window.initMap = this.initMap;
    openGmap('https://maps.googleapis.com/maps/api/js?key=AIzaSyBjJdrQgRfSMEpE0_uW6ADz0DwPKoO_bEw&callback=initMap');
  }

  initMap = () => {
    const {island, markers} = this.state;
    console.log(island);
    console.log(markers);
    //define variables
    var styles = [
      {
          "featureType": "all",
          "elementType": "geometry",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#ff0000"
              },
              {
                  "saturation": "0"
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.text",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#444444"
              }
          ]
      },
      {
          "featureType": "administrative.country",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "administrative.province",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "saturation": "-62"
              },
              {
                  "color": "#ffffff"
              }
          ]
      },
      {
          "featureType": "administrative.province",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#000000"
              },
              {
                  "weight": "1.53"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#f2f2f2"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#ffffff"
              }
          ]
      },
      {
          "featureType": "landscape.man_made",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "landscape.natural.landcover",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#ff0000"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
              {
                  "saturation": -100
              },
              {
                  "lightness": 45
              },
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "labels.text",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#000000"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      }
    ]
    // Constructor creates a new map
    let map = new window.google.maps.Map(document.getElementById('map'), {
       zoom: 6,
       center: {lat: 64.126, lng: -18.817},
       styles: styles,
       //mapTypeControl: false
     });
     this.setState({
       map
     });

    for (var i = 0; i < island.length; i++) {
      // Get the position from the location array
      var position = island[i].location;
      var title = island[i].title;
      var id = island[i].key;

      // Create a marker per location, and put into markers array.
      var marker = new window.google.maps.Marker({
        map: map,
        position: position,
        title: title,
        animation: window.google.maps.Animation.DROP,
        //icon: defaultIcon,
        id: id
      });

      markers.push(marker);
      console.log(marker.title);

      marker.addListener('click', function(){
        this.displayIF(marker);
      })
    }

      marker.addListener('click', function(){
        this.closeIF();
      })

  };

  displayIF = (marker) => {
    this.setState({
      infoWindow: true,
      contenu: 'yoyoyo'
    })
  }

  closeIF = (marker) => {
    this.setState({
      infoWindow: false
    })
  }

render() {
  return (
    <div className="App">
      <VolcanList
        volcano={this.state.island}
        markers={this.state.markers}
        openIF={this.openIF}
        />
      <div id="map" role="application"></div>
    </div>
  )
}

}


function openGmap(source) {
  var ref = window.document.getElementsByTagName('script')[0];
  var script= window.document.createElement('script');
  script.src = source;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
}

export default App
