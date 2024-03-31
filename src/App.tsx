import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./screens/login";
import Home from "./screens/home";
import Group from "./screens/group";


const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const PrivateRoute = ({ element: Component, ...rest }: { element: React.ElementType, [key: string]: any }) => {
  return isAuthenticated() ? <Component {...rest} /> : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<PrivateRoute element={Home} />} />
        <Route path="/groups" element={<PrivateRoute element={Group} />} />
      </Routes>
    </Router>
  );
}

export default App;