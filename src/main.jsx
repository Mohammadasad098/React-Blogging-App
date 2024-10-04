import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';
import RegisterProtectedRoute from './components/RegisterProtectedRoute.jsx';
import Logout from './pages/Logout.jsx';
import SingleUser from './pages/SingleUser.jsx';
import LoginProtectedRoute from './components/LoginProtectedRoute.jsx';

const router = createBrowserRouter([
    {
        path: "",
        element: <Layout/>,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "login",
                element: <LoginProtectedRoute component={<Login/>}/>
            },
            {
                path: "register",
                element: <RegisterProtectedRoute component={<Register/>}/>
            },
            {
                path: "profile",
                element: <ProtectedRoutes component={<Profile/>}/>
            },
            {
                path: "dashboard",
                element: <ProtectedRoutes component={<Dashboard/>}/>
            },
            {
                path: "logout",
                element: <ProtectedRoutes component={<Logout/>}/>
            },
            {
                path: "singleUser/:uid",
                element: <SingleUser/>
            },
            {
                path: "user",
                element: <ProtectedRoutes/>
            },
        ]
    }
])


createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}>
        <App />
    </RouterProvider>
)
