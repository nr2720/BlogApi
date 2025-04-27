import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import ProtectedRoute from '../pages/protected/ProtectedRoute';

//Routes for not Auth only
import Login from "../pages/users/login/LoginPage";
import Register from "../pages/users/register/Register";
import Logout from '../pages/users/Logout';


//Routes for auth only
import AuthIndex from "../pages/protected/AuthIndex";
import Home from "../pages/protected/Home";
import PostsIndex from "../pages/posts/PostsIndex";
import CreatePost from "../pages/posts/CreatePost";
import ProfilePost from "../pages/posts/ProfilePost";
import Feed from "../pages/feed/Feed";


const Routes = () => {
    //get the token
    const {token} = useAuth();


    //all the routes
    const routesForPublic = [
        {
            path: '/about-us',
            element: <div>About us</div>
        },
        {
            path: "/service",
            element: <div>Service Page</div>,
          },
        {
            path: "/register",
            element: <Register />,
        },
    ];
    const routesForAuthOnly = [
        {
            path: '/',
            element: <ProtectedRoute />,
            children: [
                {
                    path: '/home',
                    element: <Home/>,
                },
                {
                    path: '/profile',
                    element: < AuthIndex />
                },
                {
                    path: '/logout',
                    element: <Logout/>
                },
                {
                    path: '/feed',
                    element: <Feed/>
                },
                {
                    path: '/posts',
                    element: <PostsIndex/>,
                    children: [
                        {path: 'create', element: <CreatePost/>},
                        {path: 'myposts', element: <ProfilePost/>},
                    ]
                }
            ]
        }
    ];
    const routesForNotAuthenticatedOnly = [
        {
          path: "/",
          element: <div>Home Page</div>,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ];

      const router = createBrowserRouter([
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthOnly,
      ]);

      return <RouterProvider router={router} />;

}

export default Routes;