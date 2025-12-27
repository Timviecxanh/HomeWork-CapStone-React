import { Routes, Route, Navigate } from "react-router-dom";
import renderRoutes from "./routes/Route.jsx";

function App() {
  return (
    <div className="min-h-screen w-full bg-[url('https://www.majorplatinumcineplex.la/assets/images/background-top.png')] bg-cover bg-no-repeat bg-center">
      <Routes>{renderRoutes()}</Routes>
    </div>
  );
}

export default App;
