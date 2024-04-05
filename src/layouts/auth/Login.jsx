import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Outlet, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let token = urlParams.get('token');
    if (token) {
      Cookies.set('token', token, { expires: 3 });
      navigate(window.location.pathname, { replace: true }); // Clear the URL
    }else if (Cookies.get('token')) {
      navigate(window.location.pathname, { replace: true });
    }else{
      navigate('/');
    }
  }, [navigate]);

  return <>{(Cookies.get('token')) && <Outlet />}</>;
}

export default Login;
