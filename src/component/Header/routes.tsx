import PostDetail from '../Post/PostDetail/PostDetail';
import Blog from '../../container/Blog/Blog';
import BlogDetail from '../../container/Blog/BlogDetail/BlogDetail';
import CalorieTracker from '../../container/CalorieTracker/CalorieTracker';
import FoodDetail from '../../container/FoodDetail/FoodDetail';
import Queries from '../../container/Queries/Queries';
import OtherProfile from '../../container/Profile/OtherProfile/OtherProfile';
import CurrentProfile from '../../container/Profile/CurrentProfile/CurrentProfile';
import Setting from '../../container/Setting/Setting';
import Home from "../../container/Home/Home";
import AdminBlog from "../../container/admin/pages/Blog/Blog";
import CreateBlog from "../../container/admin/pages/CreateBlog/CreateBlog";
import FoodStats from "../../container/FoodStats/FoodStats";
import HistoryLog from "../../container/HistoryLog/HistoryLog";

export interface RoutesLink {
   component: JSX.Element;
   path: string;
}

export const sideBarRoutes = [
   {
      path: "/admin/blogs",
      component: <AdminBlog/>
   },
   {
      path: "/admin/create/blog",
      component: <CreateBlog/>
   },
   {
      path: "/admin/update/blog/:id",
      component: <CreateBlog/>
   }
]

export const mainRoutes: RoutesLink[] = [
   {
      path: '/home',
      component: <Home />,
   },
   {
      path: '/post-detail/:id',
      component: <PostDetail />,
   },
   {
      path: '/blog',
      component: <Blog />,
   },
   {
      path: '/blog/:id',
      component: <BlogDetail />,
   },
   {
      path: '/food-stats/:id',
      component: <FoodStats/>
   },
   {
      path: '/history',
      component: <HistoryLog/>
   },
   {
      path: '/calorie-tracker',
      component: <CalorieTracker />,
   },
   {
      path: '/food-detail/:id',
      component: <FoodDetail />,
   },
   {
      path: '/queries',
      component: <Queries />,
   },
   {
      path: '/other-profile/:id',
      component: <OtherProfile />,
   },
   {
      path: '/profile',
      component: <CurrentProfile />,
   },
   {
      path: '/setting',
      component: <Setting />,
   }
];
