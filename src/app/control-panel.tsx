import { memo } from "react";

const eventNames = ["onDragStart", "onDrag", "onDragEnd"];

function round5(value: number) {
	return (Math.round(value * 1e5) / 1e5).toFixed(5);
}

type Props = {
	data: Record<string, string>;
};

function ControlPanel({ data }: Readonly<Props>) {
	return (
		<div className="control-panel">
			<h3>Control Panel</h3>
			<p>Some fancy features.</p>
			<div>
				{Object.entries(data).map(([key, value]) => (
					<div key={key}>
						<strong>{key}</strong>: {value}
					</div>
				))}
			</div>
		</div>
	);
}

export default memo(ControlPanel);
