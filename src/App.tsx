import { Link, Navigate, Outlet, Route, Routes } from "react-router-dom";
import EmployeesPage from "./pages/EmployeesPage";
import EmployeeDetailPage from "./pages/EmployeeDetailPage";

function Layout() {
  return (
    <div style={{ padding: 16 }}>
      <h2>React Mini</h2>

      <nav style={{ display: "flex", gap: 12 }}>
        <Link to="/employees">Employees</Link>
      </nav>

      <hr />
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/employees" replace />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/employees/:id" element={<EmployeeDetailPage />} />
        <Route path="*" element={<div>404</div>} />
      </Route>
    </Routes>
  );
}
