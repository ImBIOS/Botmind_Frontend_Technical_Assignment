"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import { memo } from "react";
import ReactMapGL, {
	AttributionControl,
	FullscreenControl,
	GeolocateControl,
	Marker,
	NavigationControl,
	ScaleControl,
} from "react-map-gl/maplibre";
import Pin from "./pin";

const robotsData = [
	{ id: "001", x: 406, y: 334, heading: 0 },
	{ id: "002", x: 1101, y: 613, heading: 60 },
	{ id: "003", x: 922, y: 946, heading: 240 },
	{ id: "004", x: 863, y: 324, heading: 330 },
];

const localXToLongitude = (x: number) => {
	return 103.7815 + (x - 1_030) * 0.000004;
};

const localYToLatitude = (y: number) => {
	return 1.30395 - (y + 550) * 0.0000031;
};

const settings = {
	scrollZoom: false,
	boxZoom: false,
	dragRotate: false,
	dragPan: true,
	keyboard: false,
	doubleClickZoom: false,
	touchZoomRotate: false,
	touchPitch: false,
};

const MapView = () => {
	return (
		<ReactMapGL
			{...settings}
			initialViewState={{
				longitude: 103.7801796,
				latitude: 1.3004563,
				zoom: 17.9,
				bearing: 0,
				pitch: 0,
			}}
			style={{ width: "100vw", height: "100vh" }}
			mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${process.env.NEXT_PUBLIC_MAPLIBRE_ACCESS_TOKEN}`}
		>
			<GeolocateControl position="top-left" />
			<FullscreenControl position="top-left" />
			<NavigationControl position="top-left" />
			<ScaleControl />
			<AttributionControl
				style={{ color: "black" }}
				customAttribution="Map design by Imamuzzaki Abu Salam"
			/>

			<Marker longitude={103.78026} latitude={1.29897} anchor="bottom">
				<img
					src="/robot_map/campus_sim.png"
					alt="Robot"
					className="w-[100%] h-[100%] opacity-50 -rotate-[8deg]"
				/>
			</Marker>

			{robotsData.map((robot) => (
				<Marker
					key={`marker-${robot.id}`}
					longitude={localXToLongitude(robot.x)}
					latitude={localYToLatitude(robot.y)}
					className="text-black text-xs"
				>
					<Pin rotate={`${robot.heading + 180}deg`} />
					{robot.id}
				</Marker>
			))}
		</ReactMapGL>
	);
};

export default memo(MapView);
