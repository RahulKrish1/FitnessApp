import { useEffect, useState } from 'react'
import { Routes,Route ,BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isAuth } from './store/actions/users';
import { Loader } from './utils/tools';


import MainLayout from './hoc/mainLayout';
import Header from './components/navigation/header';
import Home from './components/home';
import Auth from './components/auth';
import Progress from './components/progress/progress';
import AccountVerify from './components/auth/verification';

import Dashboard from './components/dashboard';
import AdminProgress from './components/dashboard/progress';
import AdminProfile from './components/dashboard/profile';
import DashboardMain from './components/dashboard/main';
import AddProgress from './components/dashboard/progress/edit_add/add';
import EditProgress from './components/dashboard/progress/edit_add/edit';

import AuthGuard from './hoc/authGuard';

const Router = () => {
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();
  const users = useSelector(state=> state.users)


  useEffect(()=>{
    dispatch(isAuth())
  },[])


  useEffect(()=>{
    if(users.auth !== null){
      setLoading(false)
    }
  },[users])



  return(
    <BrowserRouter>
    { loading ?
      <Loader/>
      :
      <>
        <Header/>
        <MainLayout>
          <Routes>
            <Route path='/dashboard' element={
              <AuthGuard>
                <Dashboard/>
              </AuthGuard>
            }>
                <Route index element={<DashboardMain/>}/>
                <Route path='profile' element={<AdminProfile/>}/>
                <Route path='progress' element={<AdminProgress/>}/>
                <Route path='progress/add' element={<AddProgress/>}/>
                <Route path='progress/edit/:progressId' element={<EditProgress/>}/>
            </Route>
            <Route path='/verification' element={<AccountVerify/>}/>
            <Route path='/progress/progress/:id' element={<Progress/>}/>
            <Route path='/auth' element={<Auth/>}/>
            <Route path='/' element={<Home/>}/>
          </Routes>
        </MainLayout>
      </>
      }
    </BrowserRouter>
  )
}

export default Router;