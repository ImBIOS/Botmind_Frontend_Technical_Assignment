"use client";

import { env } from "@/env";
import "maplibre-gl/dist/maplibre-gl.css";
import { memo, useEffect, useState } from "react";
import ReactMapGL, {
	AttributionControl,
	FullscreenControl,
	GeolocateControl,
	Marker,
	NavigationControl,
	Popup,
	ScaleControl,
} from "react-map-gl/maplibre";
import ControlPanel from "./control-panel";
import Pin from "./pin";

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

type Robot = {
	id: string;
	x: number;
	y: number;
	heading: number;
};

// Fake animation moving robots in a circle
function tweenOnCircle(robot: Robot) {
	const x = robot.x - 1_030;
	const y = robot.y + 550;
	const angle = (robot.heading * Math.PI) / 180;
	const radius = 1;
	const speed = 0.1;

	const newX = x + radius * Math.cos(angle + speed);
	const newY = y + radius * Math.sin(angle + speed);

	return {
		x: newX + 1_030,
		y: newY - 550,
		heading: (robot.heading + 1) % 360,
	};
}
const img1 = new Image();

const MapView = () => {
	const [popupInfo, setPopupInfo] = useState<Robot | null>();
	const [robotsData, setRobotsData] = useState<Robot[]>([
		{ id: "001", x: 406, y: 334, heading: 0 },
		{ id: "002", x: 1101, y: 613, heading: 60 },
		{ id: "003", x: 922, y: 946, heading: 240 },
		{ id: "004", x: 863, y: 324, heading: 330 },
	]);
	const [controlPanelData, setControlPanelData] = useState<
		Record<string, string>
	>({});

	img1.src = "/robot_map/campus_sim.png";
	img1.onload = () => {
		const width = img1.width;
		const height = img1.height;
		// Area in square pixels
		const area = width * height;
		const perimeter = 2 * (width + height);

		setControlPanelData({
			...controlPanelData,
			Width: `${width}px`,
			Height: `${height}px`,
			Area: `${area}px²`,
			Perimeter: `${perimeter}px`,
		});
	};

	useEffect(() => {
		const animation = window.requestAnimationFrame(() => {
			setRobotsData(
				robotsData.map((robot) => ({
					...robot,
					...tweenOnCircle(robot),
				})),
			);
			if (popupInfo) {
				setPopupInfo({
					...popupInfo,
					...tweenOnCircle(popupInfo),
				});
			}
		});
		return () => window.cancelAnimationFrame(animation);
	}, [popupInfo, robotsData]);

	return (
		<>
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
				mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${env.NEXT_PUBLIC_MAPLIBRE_ACCESS_TOKEN}`}
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
						onClick={(e) => {
							// If we let the click event propagates to the map, it will immediately close the popup
							// with `closeOnClick: true`
							e.originalEvent.stopPropagation();
							setPopupInfo(robot);
						}}
					>
						<Pin rotate={`${robot.heading + 180}deg`} />
						{robot.id}
					</Marker>
				))}

				{popupInfo && (
					<Popup
						anchor="top"
						longitude={localXToLongitude(popupInfo.x)}
						latitude={localYToLatitude(popupInfo.y)}
						onClose={() => setPopupInfo(null)}
						className="text-black"
					>
						<p>Robot ID: {popupInfo.id}</p>
						<p>
							Location: {Math.floor(popupInfo.x)}, {Math.floor(popupInfo.y)}
						</p>
						<p>Heading: {popupInfo.heading}°</p>
						<p>Latitude: {localYToLatitude(popupInfo.y)}</p>
						<p>Longitude: {localXToLongitude(popupInfo.x)}</p>
						<p>Timestamp: {new Date().toLocaleString()}</p>
					</Popup>
				)}
			</ReactMapGL>
			<ControlPanel data={controlPanelData} />
		</>
	);
};

export default memo(MapView);
