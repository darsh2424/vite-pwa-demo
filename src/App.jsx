import { useState } from "react"; 
import './App.css';
import ViewerComponent from "./components/ViewerComponent";

function App() {
    const [document, setDocument] = useState("/document.pdf");  

    const handleOpen = () => setDocument("/another-example.pdf");  

    return (
        <div className="App" style={{ width: "100vw" }}>
            <button className="App-button" onClick={handleOpen}>
                Open another document
            </button>
            <div className="App-viewer">
                <ViewerComponent document={document} />
            </div>
        </div>
    );
}

export default App;
