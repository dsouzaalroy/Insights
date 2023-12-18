// import { useHistory } from 'react-router-dom';
function Authenticator(){
    // const history = useHistory();
    // let env = require('dotenv').config()

    const  generateRandomString = (length:number) =>{
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      
        for (let i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
      }

    const requestAuth = () =>{
        const client_id = process.env.REACT_APP_CLIENT_ID || 'default_client_id'; 
        const redirect_uri = process.env.REACT_APP_REDIRECT_URI || 'default_redirect_uri';
        
        var state = generateRandomString(16);

        localStorage.setItem("stateKey", state);
        var scope = 'user-read-private user-read-email user-top-read user-read-recently-played';

        var url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(client_id);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
        url += '&state=' + encodeURIComponent(state);

        window.location.href = url;

    }
      
      return(
        <div>
            <button onClick={() => requestAuth()}>Log in</button>
        </div>
      )

}export default Authenticator;