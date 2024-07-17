import React, { useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import AdminHeader from '../components/header/AdminHeader';
import ClientHeader from '../components/header/ClientHeader';
import './Layout.css';
import jwt_decode from 'jwt-decode'

function Layout() {
  const { user } = useAuth();

  const memoizedHeader = useMemo(() => {
    
    const members = jwt_decode(window.localStorage.getItem('accessToken'))

    if (members.memberRole==='b') {
      return <ClientHeader />;
      
    } else {
      return <AdminHeader />;
    }
   // 사용자 타입이 없는 경우
  }, []);

  return (
    <div className="layout">
      {memoizedHeader}
      <Outlet />
    </div>
  );
}

export default Layout;
