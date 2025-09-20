import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./custom_css/custom_all.css";
import MyPortfolio from "./components";

function App() {
  return (
    <div className="small user-select-none" style={{ height: "100vh" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyPortfolio />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
