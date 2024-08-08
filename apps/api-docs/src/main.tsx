import React from "react";
import ReactDOM from "react-dom/client";
import App from "./view/App.tsx";
import "./index.css";

const el = document.getElementById("root");
if (el) {
	const root = ReactDOM.createRoot(el);
	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	);
} else {
	throw new Error("Could not find root element");
}
