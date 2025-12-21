import "./App.css";
import { BrowserRouter, Routes } from "react-router-dom";
import renderRoutes from "./route/route"; // Hoặc './route/route' tùy tên file

function App() {
  return (
    <BrowserRouter>
     
      <Routes>{renderRoutes()}</Routes>
    </BrowserRouter>
  );
}

export default App;
