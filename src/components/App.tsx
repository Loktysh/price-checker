import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { logUser } from '../store/actions';
import { User } from './common/types';
import { MainPage } from './pages';
import ItemsPage from './pages/ItemsPage';
import { LoginPage } from './pages/LoginPage';
import ProductPage from './pages/ProductPage';
import { SettingsPage } from './pages/SettingsPage/SettingsPage';
import { SignupPage } from './pages/SignupPage';
import { fetchUser, getStorageItem } from '../utils';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { toggleSubscribe } from '../store/slices/loginSlice';
import AppLanding from './common/AppLanding';

const App = () => {
  const dispatch = useDispatch();

  const initializeFetch = async () => {
    const token = getStorageItem('token');
    const renewToken = getStorageItem('renewToken');
    if (token && renewToken) {
      return fetchUser(token, renewToken);
    }
    return;
  };

  useEffect(() => {
    initializeFetch().then((info: User | undefined) => {
      if (info) {
        dispatch(toggleSubscribe(info.user.isNotificationOn));
        logUser(info.user.login, info.user.trackingProducts);
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />}>
          <Route index element={<AppLanding />} />
          <Route path='/about' element={<AppLanding />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/settings' element={<SettingsPage />} />
        </Route>
        <Route path='/profile/:user' element={<ProfilePage />} />
        <Route path='/products/:query' element={<ItemsPage />} />
        <Route path='/product/:key' element={<ProductPage />} />
      </Routes>
    </Router>
  );
};

export default App;
