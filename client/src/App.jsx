import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
    HomeLayout, Login, Landing, Register, DashboardLayout, Error,
    AddJob, AllJobs,EditJob, Stats,Profile, Admin,

} from './pages';
import {action as registerAction} from '../src/pages/Register';
import {action as loginAction} from '../src/pages/Login'
import {loader as dashboardLoader} from '../src/pages/DashboardLayout';
import {action as addJobAction} from '../src/pages/AddJob'
import {loader as allJobsLoader} from '../src/pages/AllJobs'
import {action as editJobAction} from '../src/pages/EditJob'
import {loader as editJobLoader} from '../src/pages/EditJob'
import {action as deleteJobAction} from '../src/pages/DeleteJob'
import {loader as adminLoader} from '../src/pages/Admin'
import {action as profileAction} from '../src/pages/Profile'
import {loader as statsLoader} from '../src/pages/Stats'

export const  checkDefaultTheme = () => {
    const isDarkTheme =
        localStorage.getItem('darkTheme') === 'true'
    document.body.classList.toggle('dark-theme', isDarkTheme);
    return isDarkTheme;
};
 checkDefaultTheme();



const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element : <Landing />,

            },
            {

                path: '/login',
                element: <Login />,
                action:loginAction,

            },
            {
                path: 'register',
                element: <Register />,
                action:registerAction,

            },
            {
                path: 'dashboard',
                element: <DashboardLayout  />,
                loader: dashboardLoader,
                children: [
                    {
                        index: true,
                        element: <AddJob />,
                        action: addJobAction,
                    },
                    { path: 'stats', element: <Stats />,
                loader: statsLoader, },
                    {
                        path: 'all-jobs',
                        element: <AllJobs />,
                        loader:allJobsLoader,
                    },

                    {
                        path: 'profile',
                        element: <Profile />,
                        action: profileAction,
                    },
                    {
                        path: 'admin',
                        element: <Admin />,
                        loader: adminLoader,
                    },
                    {
                        path: 'edit-job/:id',
                        element: <EditJob />,
                        loader: editJobLoader,
                        action: editJobAction,
                    },
                    {
                        path: 'delete-job/:id',
                        action: deleteJobAction,

                    },
                ],

            },
            {
                path: 'error',
                element: <Error />,

            },




        ],
    },
    
]);

const App = () => {
    return <RouterProvider router={router} />;

};

export default App;