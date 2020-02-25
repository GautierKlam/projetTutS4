import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

class map extends React.Component {
	/*render(){
		return(
				<script type="text/javascript">
					var m = [49.33333, 6.166667];
					var map = L.map('map').setView(m, 6);

					L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
						maxZoom: 20
					}
				).addTo(map);

				</script>
			</div>
		)
	}

	Affichemap() {
	  const element = (
	    <div>
	      <h1>Bonjour, monde !</h1>
	      <h2>Il est {new Date().toLocaleTimeString()}.</h2>
	    </div>
	  );
	  ReactDOM.render(element, document.getElementById('App-map'));
	}

*/


var m = [49.33333, 6.166667];
var map = L.map('map').setView(m, 6);

L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
	maxZoom: 20
}).addTo(map);

render(map, document.getElementById('map-container'))
}
export default map
