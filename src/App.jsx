import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListUsers from "./pages/listUsers";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import ProtectedRouter from "./components/ProtectedRoute";
import ListEvents from "./pages/listEvents"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/users" element={
          <ProtectedRouter>
            <ListUsers/>
          </ProtectedRouter> } />
          <Route path="/evento" element={
          <ProtectedRouter>
            <ListEvents/>
          </ProtectedRouter> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
