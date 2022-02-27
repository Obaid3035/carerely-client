import React from 'react';
import {
   BrowserRouter as Router,
   Routes,
   Route,
} from 'react-router-dom';
import Auth from './container/Auth/Auth';
import './App.scss';
import Header from './component/Header/Header';
import Home from './container/Home/Home';
import CalorieTracker from './container/CalorieTracker/CalorieTracker';
import FoodDetail from './container/FoodDetail/FoodDetail';
import Queries from './container/Queries/Queries';
import OtherProfile from './container/Profile/OtherProfile/OtherProfile';
import CurrentProfile from './container/Profile/CurrentProfile/CurrentProfile';
import PostDetail from './component/Post/PostDetail/PostDetail';
import Blog from './container/Blog/Blog';
import BlogDetail from './container/Blog/BlogDetail/BlogDetail';
import { useAppDispatch } from './services/hook';
import { IUser, setUser } from './services/slices/auth';
import Setting from './container/Setting/Setting';

function App() {
   const dispatch = useAppDispatch();
   const user: IUser = JSON.parse(localStorage.getItem('user') as string);
   dispatch(setUser(user));

   return (
      <div className='App'>
         <Router>
            <Routes>
               <Route path={'/home'} element={
                  <React.Fragment>
                     <Header />
                     <Home />
                  </React.Fragment>
               } />

               <Route path={'/post-detail'} element={
                  <React.Fragment>
                     <Header />
                     <PostDetail />
                  </React.Fragment>
               } />

               <Route path={'/blog'} element={
                  <React.Fragment>
                     <Header />
                     <Blog />
                  </React.Fragment>
               } />

               <Route path={'/blog-detail'} element={
                  <React.Fragment>
                     <Header />
                     <BlogDetail />
                  </React.Fragment>
               } />

               <Route path={'/calorie-tracker'} element={
                  <React.Fragment>
                     <Header />
                     <CalorieTracker />
                  </React.Fragment>
               } />
               <Route path={'/food-detail'} element={
                  <React.Fragment>
                     <Header />
                     <FoodDetail />
                  </React.Fragment>
               } />
               <Route path={'/queries'} element={
                  <React.Fragment>
                     <Header />
                     <Queries />
                  </React.Fragment>
               } />
               <Route path={'/other-profile/:id'} element={
                  <React.Fragment>
                     <Header />
                     <OtherProfile />
                  </React.Fragment>
               } />
               <Route path={'/profile'} element={
                  <React.Fragment>
                     <Header />
                     <CurrentProfile />
                  </React.Fragment>
               } />
               <Route path={'/setting'} element={
                  <React.Fragment>
                     <Header />
                     <Setting />
                  </React.Fragment>
               } />
               <Route path={'/'} element={<Auth />} />
            </Routes>
         </Router>
      </div>
   );
}

export default App;
