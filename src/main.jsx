import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
    onNeedRefresh() {
        if (confirm("New content available! Reload?")) {
            window.location.reload();
        }
    },
    onOfflineReady() {
        console.log("App is ready to work offline!");
    }
});

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
