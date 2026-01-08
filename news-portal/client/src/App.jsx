import { useContext, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './dashboard/layout/MainLayout'
import AdminIndex from './dashboard/pages/AdminIndex'
import Login from './dashboard/pages/Login'
import ProtectDashboatd from './middleware/ProtectDashboatd'
import ProtectRole from './middleware/ProtectRole'
import Unable from './dashboard/pages/Unable'
import AddWriter from './dashboard/pages/AddWriter'
import Writers from './dashboard/pages/Writers'
import News from './dashboard/pages/News'
import Profile from './dashboard/pages/Profile'
import WriterIndex from './dashboard/pages/WriterIndex'
import CreateNews from './dashboard/pages/CreateNews'
import storeContext from './context/storeContext'
import Edit_news from './dashboard/pages/Edit_news'
import Ads from "./dashboard/pages/Ads";

import Details from './dashboard/pages/Details';
import WriterProfile from './dashboard/pages/WriterProfile'

function App() {

  const { store } = useContext(storeContext)

  console.log("Current User Role:", store.userInfo?.role);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
         <Route path='/news/:id' element={<Details />} />
         
        <Route path='/dashboard' element={<ProtectDashboatd />} >
          <Route path='' element={<MainLayout />}>
            <Route path='' element={store.userInfo?.role === 'admin' ? <Navigate to='/dashboard/admin' /> : <Navigate to='/dashboard/writer' />} />
            <Route path='unable-access' element={<Unable />} />

            <Route path='news' element={<News />} /> 
            <Route path='news/active' element={<News newsStatus='active' />} />
            <Route path='news/pending' element={<News newsStatus='pending' />} />
            <Route path='news/deactive' element={<News newsStatus='deactive' />} />

            <Route path='profile' element={<Profile />} />
            <Route path='news/edit/:news_id' element={<Edit_news />} />
            <Route path='' element={<ProtectRole role='admin' />} >
              <Route path='admin' element={<AdminIndex />} />
              <Route path='writer/add' element={<AddWriter />} /> 
              <Route path='admin/news/create' element={<CreateNews />} />
              <Route path='writer/:id' element={<WriterProfile />} />
              <Route path='writers' element={<Writers />} />
              <Route path="ads" element={<Ads />} />
            </Route>

            <Route path='' element={<ProtectRole role='writer' />} >
              <Route path='writer' element={<WriterIndex />} />
              <Route path='news/create' element={<CreateNews />} />
            </Route>

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
