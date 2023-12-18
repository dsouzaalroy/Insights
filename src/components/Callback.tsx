import React, { useEffect, } from 'react';
import { Cookies, useCookies } from 'react-cookie';


function Callback() {
    const [token, setToken, removeToken] = useCookies(['access_token']);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const code = urlParams.get('access_token');
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000); // 1 hour in milliseconds
    if(code){
        setToken('access_token',code, {path: '/', expires: expirationDate} )
        window.location.href="http://localhost:3000/"
    }else{
        handleCodeRetrievalError();
    }



  }, []);

  const handleCodeRetrievalError = () => {
    console.error('Error retrieving code');
    alert('Error retrieving code')
  };

  return (
    <div className='flex justify-center text-5xl font-bold'>Please Wait...</div>
  );
}

export default Callback;
