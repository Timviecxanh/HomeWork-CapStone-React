import "./App.css";
import { BrowserRouter, Routes } from "react-router-dom";
import renderRoutes from "./route/route"; // Hoặc './route/route' tùy tên file

function App() {
  return (
    <BrowserRouter>
      {/* ❌ Lỗi LỚN NHẤT: Hàm renderRoutes() trả về một MẢNG các <Route>. 
          Nó PHẢI được bọc trong <Routes>. */}
      <Routes>{renderRoutes()}</Routes>
    </BrowserRouter>
  );
}

export default App;
