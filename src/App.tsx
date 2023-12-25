import React, { useEffect, useState } from 'react';

import './App.css';
import './output.css'
import { SpotifyAPI } from './components/SpotifyAPI';
import { AudioFeatures } from './interfaces/AudioFeatures';
import { TPHistory } from './interfaces/TrackPlayHistory';
import { RecentTracks } from './interfaces/RecentTracks';
import Tempo from './components/Tempo'
import { Features } from './interfaces/Features';
import { SongTempo } from './interfaces/SongTempo';
import Genres from './components/Genres';
import { ArtistTop } from './interfaces/ArtistTop';
import TimeMood from './components/TimeMood';
import Authenticator from './components/Authenticator';
import ArtistPopFol from './components/ArtistPopFol';
import { Artists } from './interfaces/Artists';
import { TokenResponse } from './interfaces/TokenResponse';
import { useCookies } from 'react-cookie';

function App() {

  const [cookies, setCookies] = useCookies(['access_token', 'refresh_token'])


  // const currentToken = {
  //   get access_token() { return localStorage.getItem('access_token') || null; },
  //   get refresh_token() { return localStorage.getItem('refresh_token') || null; },
  //   get expires_in() { return localStorage.getItem('refresh_in') || null },
  //   get expires() { return localStorage.getItem('expires') || null },
  
  //   save: function (response: TokenResponse) {
  //     const { access_token, refresh_token, expires_in } : {access_token : string, refresh_token : string, expires_in: number} = response;
  //     localStorage.setItem('access_token', access_token);
  //     localStorage.setItem('refresh_token', refresh_token);
  //     localStorage.setItem('expires_in', expires_in.toString());

  //     setIsLoggedIn(true);
  
  //     const now = new Date();
  //     const expiry = new Date(now.getTime() + (expires_in * 1000));
  //     localStorage.setItem('expires', expiry.toDateString());
  //   }
  // };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tracks, setTracks] = useState<RecentTracks>(
    {
      cursors: null,
      href: "",
      items: [],
      limit: 0,
      next: "",
      total:null,
    }
  );
  const [audioFeatures, setAudioFeatures] = useState<AudioFeatures[]>([]);  // const [api, setApi] = useState({});
  const [tempos, setTempos] = useState<Features>({
    average:0,
    highest:null,
    lowest: null,
  });
  const defaultArtistTop:ArtistTop = {
    items: [],
    total:0,
    limit:0,
  }
  const [artistsRecent, setArtistsRecent] = useState<Artists[]>([]);
  const [artistsWeek, setArtistsWeek] = useState<ArtistTop>(defaultArtistTop);
  const [artistsMonth, setArtistsMonth] = useState<ArtistTop>(defaultArtistTop);
  const [artistsYear, setArtistsYear] = useState<ArtistTop>(defaultArtistTop);
  // const [api, setApi] = useState<SpotifyAPI>(new SpotifyAPI(currentToken.access_token||""));
  const [api, setApi] = useState<SpotifyAPI>(new SpotifyAPI(cookies.access_token || ""));


  useEffect(() => {
    console.log("Outside")
    if(cookies.access_token!=undefined){
      console.log("Inside")
      setApi(new SpotifyAPI(cookies.access_token));
      setIsLoggedIn(true);
    }
  }, [cookies])

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const code = urlParams.get('code');

  //   if(code&&currentToken.access_token == undefined){
  //     const getLocalToken = async () => {
  //       const token = await getToken(code);
  //       console.log(token);
  //       const expirationDate = new Date();
  //       expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000); // 1 hour in milliseconds
  //       currentToken.save(token);
  //       const url = new URL(window.location.href);
  //       url.searchParams.delete("code");
      
  //       const updatedUrl = url.search ? url.href : url.href.replace('?', '');
  //       window.history.replaceState({}, document.title, updatedUrl);
  //     }
  //     getLocalToken();
  //   }

  //   getAccessToken();
  // }, []);

  // useEffect(() => {
  //   if(currentToken.access_token && api!==null){
  //     const initialise = async () =>{
  //       await getArtists();
  //       await getRecents();
  //     }
  //     initialise();
  //   }
  // }, [api]);



  // const getToken = async (code:any) => {

  //   let codeVerifier = localStorage.getItem('code_verifier');
  //   const tokenEndpoint = "https://accounts.spotify.com/api/token";

  //   const response = await fetch(tokenEndpoint, {
      
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },

  //     body: new URLSearchParams({
  //       client_id: process.env.REACT_APP_CLIENT_ID || "",
  //       grant_type: 'authorization_code',
  //       code: code,
  //       redirect_uri: process.env.REACT_APP_REDIRECT_URI || "",
  //       code_verifier: codeVerifier || "",
  //     }).toString(),
  //   });
  //   return response.json();
  // }

  // function getAccessToken(){
  //   try{
  //     if(!currentToken.access_token) throw Error;
  //     setApi(new SpotifyAPI(currentToken.access_token || ""))
  //     setIsLoggedIn(true);
  //   }catch(e){
  //     console.log(currentToken)
  //     setIsLoggedIn(false)
  //   }
  // }

  async function getArtists(){
    const newWeek = await api.getTopArtists("short_term");
    const newMonth = await api.getTopArtists("medium_term");
    const newYear = await api.getTopArtists("long_term");
    setArtistsWeek(newWeek);
    setArtistsMonth(newMonth);
    setArtistsYear(newYear);
  }

  function getTempoValues(audioFeatures:AudioFeatures[], tracks: RecentTracks): Features {
    var totalTempo = audioFeatures[0].tempo;
    var highestTempo: SongTempo = {tempo:audioFeatures[0].tempo, tpHist: tracks.items[0]};
    var lowestTempo: SongTempo = {tempo:audioFeatures[0].tempo, tpHist: tracks.items[0]};
  
  
    for(var i = 1; i < audioFeatures.length; i++){
      const currentTempo: number = audioFeatures[i].tempo
      const currentSong: TPHistory = tracks.items[i];
      const currentLowTempo: number = lowestTempo.tempo;
      const currentHighTempo: number = highestTempo.tempo;

      totalTempo += currentTempo;

      if(currentTempo < currentLowTempo){
        lowestTempo.tempo = currentTempo;
        lowestTempo.tpHist = currentSong;
      }

      if(currentTempo > currentHighTempo){
        highestTempo.tempo = currentTempo;
        highestTempo.tpHist = currentSong
      }

    }

    return {
      average: totalTempo/audioFeatures.length,
      highest: highestTempo,
      lowest: lowestTempo
    }
  }
  
  async function getRecents(){
    const newTracks: RecentTracks = await api.getRecents(50);

    let trackIds: string = "";
    let artists: string = "";
    for(let i=0; i< newTracks.items.length;i++){
      trackIds+=newTracks.items[i].track.id;
      artists+=newTracks.items[i].track.artists[0].id;
      if(i!==newTracks.items.length-1)trackIds+=",";
      if(i!==newTracks.items.length-1)artists+=",";

    }

    const newAf: AudioFeatures[]  = await api.getAudioFeatures(trackIds)
    const tempos: Features = getTempoValues(newAf, newTracks);
    const newArtistsRecent = await api.getArtists(artists);
    const newArtistWeek = await api.getArtists(getTopArtistIds(artistsWeek));
    const newArtistMonth = await api.getArtists(getTopArtistIds(artistsMonth));
    const newArtistYear = await api.getArtists(getTopArtistIds(artistsYear));
    setTracks(newTracks)
    setAudioFeatures(newAf);
    setTempos(tempos);
    setArtistsRecent(newArtistsRecent);
    setArtistsWeek(prev => ({...prev, items:newArtistWeek}))
    setArtistsMonth(prev => ({...prev, items:newArtistMonth}))
    setArtistsYear(prev => ({...prev, items:newArtistYear}))
  }

  const getTopArtistIds = (tracks:ArtistTop) =>{
    let artists: string = "";
    for(let i=0; i< tracks.items.length;i++){
      artists+=tracks.items[i].id;
      if(i!==tracks.items.length-1)artists+=",";
    }
    return artists;
  }

  
  return (
    <div className="App">
      <header className="App-header">
        <button style={{visibility:isLoggedIn ? 'hidden' : 'visible'}}>
          <Authenticator/>
        </button>
        <button onClick={getArtists}>Get Artists</button>
        <button onClick={getRecents}>Get Recent</button>
        <div className='flex flex-col '>
          <div className = "my-72">
            <Tempo 
              highest={tempos.highest}
              average={tempos.average}
              lowest={tempos.lowest}
            />
          </div>
          <div className = "my-72">
            <Genres week={artistsWeek} month={artistsMonth} year={artistsYear}/>
          </div>
          <div className = "my-72">
            <TimeMood tracks={tracks} audioFeatures ={audioFeatures}/>
          </div>
          <div className = "my-72">
            <ArtistPopFol 
            week = {artistsWeek.items}
            month = {artistsMonth.items}
            year = {artistsYear.items}
            recent = {artistsRecent}
            />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
