import { useState } from 'react';
import './App.css';
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMapEvents,
} from 'react-leaflet';

function App() {
	const [pos, setPos] = useState([51.505, -0.09]);
	const [text, setText] = useState('');
	const [zoom, setZoom] = useState(13);
	function LocationMarker() {
		const map = useMapEvents({
			click() {
				map.locate();
			},
			locationfound(e) {
				setPos(e.latlng);
				setText('you are here');
				map.flyTo(e.latlng, map.getZoom());
			},
		});
		return (
			<Marker position={pos}>{text !== '' && <Popup>{text}</Popup>}</Marker>
		);
	}
	return (
		<>
			<h1>🌝🌚</h1>
			<input type='checkbox' id='switch' />
			<label for='switch'></label>
			<section class='dark-mode'></section>
			<div className='app'>
				<MapContainer center={pos} zoom={zoom} scrollWheelZoom={true}>
					<TileLayer
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
						// attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					/>
					<LocationMarker />
				</MapContainer>
			</div>
		</>
	);
}

export default App;
