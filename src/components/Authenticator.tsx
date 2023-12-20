// import { useHistory } from 'react-router-dom';
function Authenticator(){
    const requestAuth = async () =>{
        const client_id = process.env.REACT_APP_CLIENT_ID || 'default_client_id'; 
        const redirect_uri = process.env.REACT_APP_REDIRECT_URI || 'default_redirect_uri';
        
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

        console.log(url);
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