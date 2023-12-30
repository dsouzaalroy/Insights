import { useEffect, useState } from "react";
import { TokenResponse } from "../interfaces/TokenResponse";
import { useCookies } from "react-cookie";

function Authenticator(){

  const tokenEndpoint = "https://accounts.spotify.com/api/token";
  const redirect_uri = (process.env.NODE_ENV === 'production' ?  process.env.REACT_APP_REDIRECT_URI_PROD : process.env.REACT_APP_REDIRECT_URI_DEV) || 'invalid_redirect_uri'
  const [cookies, setCookies] = useCookies(['access_token', 'refresh_token'])

  const currentToken = {
  
    save: function (response: TokenResponse) {
      const { access_token, refresh_token, expires_in } : {access_token : string, refresh_token : string, expires_in: number} = response;
      setCookies('access_token', access_token, {maxAge: expires_in})
      setCookies('refresh_token', refresh_token);
    }
  };
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if(code && cookies.access_token == undefined){
      const getLocalToken = async () => {
        const token = await generateToken(code);
        currentToken.save(token);
        const url = new URL(window.location.href);
        url.searchParams.delete("code");
      
        const updatedUrl = url.search ? url.href : url.href.replace('?', '');
        window.history.replaceState({}, document.title, updatedUrl);
      }
      getLocalToken();
    }

  });

  const generateToken = async (code:string) => {

    let codeVerifier = localStorage.getItem('code_verifier');
    const response = await fetch(tokenEndpoint, {
      
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: new URLSearchParams({
        client_id: process.env.REACT_APP_CLIENT_ID || "",
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri || "",
        code_verifier: codeVerifier || "",
      }).toString(),
    });
    return response.json();
  }

    const requestAuth = async () =>{
        const client_id = process.env.REACT_APP_CLIENT_ID || 'default_client_id';        
        var state = generateRandomString(16);

        const hashed = await sha256(codeVerifier)
        const codeChallenge = base64encode(hashed);

        localStorage.setItem('code_verifier', codeVerifier);
        localStorage.setItem("stateKey", state);
        var scope = 'user-read-private user-read-email user-top-read user-read-recently-played';

        var url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=code';
        url += '&client_id=' + encodeURIComponent(client_id);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
        url += '&state=' + encodeURIComponent(state);
        url += '&code_challenge=' + encodeURIComponent(codeChallenge);
        url += '&code_challenge_method=' + encodeURIComponent('S256');

        window.location.href = url;
    }
    const generateRandomString = (length:number) => {
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const values = crypto.getRandomValues(new Uint8Array(length));
      return values.reduce((acc, x) => acc + possible[x % possible.length], "");
    }
    
    const codeVerifier  = generateRandomString(64);
    
    const sha256 = async (plain:string) => {
      const encoder = new TextEncoder()
      const data = encoder.encode(plain)
      return window.crypto.subtle.digest('SHA-256', data)
    }
    
    const base64encode = (input:any) => {
      return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
    }

      return(
        <div>
            <button onClick={() => requestAuth()}>Log in</button>
        </div>
      )

}export default Authenticator;