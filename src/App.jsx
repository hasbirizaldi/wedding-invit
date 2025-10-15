import Main from "./pages/Main";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import LayoutUser from "./pages/user/LayoutUser";
import LayoutAdmin from "./pages/admin/LayoutAdmin";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import Dashboard from "./pages/user/Dashboard";
import ListAdmin from "./pages/admin/ListAdmin";
import Create from "./pages/user/Create";
import Edit from "./pages/user/Edit";
import CreateAdmin from "./pages/admin/CreateAdmin";
import EditAdmin from "./pages/admin/EditAdmin";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/:slug" element={<Main />} />
        <Route path="/demo" element={<Main />} />

        <Route path="/hasbi" element={<LayoutAdmin />}>
          <Route index element={<DashboardAdmin />} />
          <Route path="list" element={<ListAdmin />} />
          <Route path="create" element={<CreateAdmin />} />
          <Route path="edit/:id" element={<EditAdmin />} />
        </Route>

        {/* User */}
        <Route path="/" element={<LayoutUser />}>
          <Route index element={<Dashboard />} />
          <Route path="create" element={<Create />} />
          <Route path="edit/:id" element={<Edit />} />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default App;
