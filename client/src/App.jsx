import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
    HomeLayout, Login, Landing, Register, DashboardLayout, Error,
    AddJob, AllJobs,EditJob, Stats,Profile, Admin,

} from './pages';
import ErrorElement from './components/ErrorElement';
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
const isDarkThemeEnabled = checkDefaultTheme();
 const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
      },
    },
  });


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
                action:loginAction(queryClient),

            },
            {
                path: 'register',
                element: <Register />,
                action:registerAction,

            },
            {
                path: 'dashboard',
                element: <DashboardLayout  isDarkThemeEnabled={isDarkThemeEnabled} queryClient={queryClient}/>,
                loader: dashboardLoader(queryClient),
                children: [
                    {
                        index: true,
                        element: <AddJob />,
                        action: addJobAction(queryClient),
                    },
                    { path: 'stats', element: <Stats />,
                loader: statsLoader(queryClient), 
            errorElement: <h4>There was error</h4>},
                    {
                        path: 'all-jobs',
                        element: <AllJobs />,
                        loader:allJobsLoader(queryClient),
                        errorElement:<ErrorElement />,
                    },

                    {
                        path: 'profile',
                        element: <Profile />,
                        action: profileAction(queryClient),
                    },
                    {
                        path: 'admin',
                        element: <Admin />,
                        loader: adminLoader,
                    },
                    {
                        path: 'edit-job/:id',
                        element: <EditJob />,
                        loader: editJobLoader(queryClient),
                        action: editJobAction(queryClient),
                    },
                    {
                        path: 'delete-job/:id',
                        action: deleteJobAction(queryClient),

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
    return
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    
    

};

export default App;