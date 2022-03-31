import React from 'react';
import {
   BrowserRouter as Router,
   Routes,
   Route,
} from 'react-router-dom';
import Auth from './container/Auth/Auth';
import './App.scss';
import Header from './component/Header/Header';
import { mainRoutes, sideBarRoutes } from "./component/Header/routes";
import PrivateRoute from "./component/PrivateRoute/PrivateRoute";
import Blog from "./container/admin/pages/Blog/Blog";
import SideBar from "./container/admin/SideBar/SideBar";
import CreateBlog from "./container/admin/pages/CreateBlog/CreateBlog";

export enum USER_ROLE {
   USER = "user",
   ADMIN = "admin"
}

function App() {
   const userLayout = (
     mainRoutes.map((item, index) => (
       <Route key={index} path={item.path} element={
          <React.Fragment>
             <Header />
             <PrivateRoute role={USER_ROLE.USER}>
                { item.component }
             </PrivateRoute>
          </React.Fragment>
       } />
     ))
   )

  const adminLayout = (
    sideBarRoutes.map((item, index) => (
      <Route key={index} path={item.path} element={
        <React.Fragment>
          <SideBar/>
          <PrivateRoute role={USER_ROLE.ADMIN}>
            { item.component }
          </PrivateRoute>
        </React.Fragment>
      } />
    ))
  )

   return (
      <div className='App'>
         <Router>
            <Routes>
               { userLayout }
              { adminLayout }
              <Route path={"/auth"} element={<Auth/>}/>
            </Routes>
         </Router>
      </div>
   );
}

export default App;
