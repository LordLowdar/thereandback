mapboxgl.accessToken = 'pk.eyJ1IjoiY3J5c3RlcmFuIiwiYSI6ImNrczZzeGd2NjA0NWwyb3Blb2F5N242cXEifQ.GMDXDqZXp4_9RwxkhsxKog';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    center: [-122.662323, 45.523751], // starting position
    zoom: 12
});
// set the bounds of the map
// var bounds = [[-123.069003, 45.395273], [-122.303707, 45.612333]];
// map.setMaxBounds(bounds);

// initialize the map canvas to interact with later
var canvas = map.getCanvasContainer();

// an arbitrary start will always be the same
// only the end or destination will change
var start = [-122.662323, 45.523751];
var end = [-122.662323, 45.523751]
// this is where the code for the next step will go
// create a function to make a directions request
function getRoute(end) {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change
    var start = localStorage.getItem('startCoords')
    if (start == undefined){
        fetchStart()
        var x = localStorage.getItem('startCoords')
        start = JSON.parse(x)
        console.log(start)

    } else{
        var x = localStorage.getItem('startCoords')
        start = JSON.parse(x)
        console.log(start)
    }
    
    var end = localStorage.getItem('endCoords')
    if(end == undefined){
        fetchEnd()
        var x = localStorage.getItem('endCoords')
        end = JSON.parse(x)
        console.log(end)
    } else{
        var x = localStorage.getItem('endCoords')
        end = JSON.parse(x)
        console.log(end)
    }
    var url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;

    // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.onload = function () {
        var json = JSON.parse(req.response);
        var data = json.routes[0];
        console.log(data)
        var instructions = document.getElementById('instructions');
        var steps = data.legs[0].steps;
        var tripInstructions = [];
        for (var i = 0; i < steps.length; i++) {
            tripInstructions.push('<br><li>' + steps[i].maneuver.instruction) + '</li>';
            instructions.innerHTML = '<br><span class="duration">Trip duration: ' + Math.floor(data.duration / 60) + ' min 🚴 </span>' + tripInstructions;
        }
        var route = data.geometry.coordinates;
        var geojson = {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: route
            }
        };
        // if the route already exists on the map, reset it using setData
        if (map.getSource('route')) {
            map.getSource('route').setData(geojson);
        } else { // otherwise, make a new request
            map.addLayer({
                id: 'route',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: geojson
                        }
                    }
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#3887be',
                    'line-width': 5,
                    'line-opacity': 0.75
                }
            });
        }
        // add turn instructions here at the end
    };
    req.send();
}

map.on('load', function () {
    // make an initial directions request that
    // starts and ends at the same location
    getRoute(start);

    // Add starting point to the map
    map.addLayer({
        id: 'point',
        type: 'circle',
        source: {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'Point',
                        coordinates: start
                    }
                }
                ]
            }
        },
        paint: {
            'circle-radius': 10,
            'circle-color': '#3887be'
        }
    });
    // this is where the code from the next step will go
    // get the sidebar and add the instructions
});
function fetchStart() {
    var cityString = localStorage.getItem('startingCity')
    console.log(cityString)
    city = encodeURIComponent(cityString)
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + city + '.json?access_token=pk.eyJ1IjoiY3J5c3RlcmFuIiwiYSI6ImNrczZzeGd2NjA0NWwyb3Blb2F5N242cXEifQ.GMDXDqZXp4_9RwxkhsxKog'
    console.log(url)
    fetch(url)
        .then(response => response.json())
        .then(data =>{ 
            console.log(data)
            startCoords(data)
        }
        );
}

function startCoords(data){
    var startCoords = data.features[0].center
    localStorage.setItem('startCoords', JSON.stringify(startCoords))
}

function fetchEnd() {
    var cityString = localStorage.getItem('EndingCity')
    console.log(cityString)
    city = encodeURIComponent(cityString)
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + city + '.json?access_token=pk.eyJ1IjoiY3J5c3RlcmFuIiwiYSI6ImNrczZzeGd2NjA0NWwyb3Blb2F5N242cXEifQ.GMDXDqZXp4_9RwxkhsxKog'
    console.log(url)
    fetch(url)
        .then(response => response.json())
        .then(data =>{ 
            console.log(data)
            endCoords(data)
        }
        );
}

function endCoords(data){
    var endCoords = data.features[0].center
    localStorage.setItem('endCoords', JSON.stringify(endCoords))
}
fetchStart()
fetchEnd()