import { Button } from "reactstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import PrivateRoute from "./Component/PrivateRoute";
import Dashboard from "./Pages/PrivateRoutes/Dashboard";
import ProfileInfo from "./Pages/PrivateRoutes/ProfileInfo";
import About from "./Pages/About";
import PostPage from "./Pages/PostPage";
function App() {
  return (
    <div className="App">
      
        <BrowserRouter>
        <ToastContainer/>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About/>} />
          <Route path="/posts/:postId" element={<PostPage/>} />
          <Route path="/user" element={<PrivateRoute/>}>
              <Route path="dashboard" element={<Dashboard/>} />
              <Route path="profile-info" element={<ProfileInfo/>} />
          </Route>
         
          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
