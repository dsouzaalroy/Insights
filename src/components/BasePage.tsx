import React, { useEffect, useState } from 'react';

import { SpotifyAPI } from './SpotifyAPI';
import Tempo from './Tempo'
import Genres from './Genres';
import TimeMood from './TimeMood';
import Authenticator from './Authenticator';
import ArtistPopFol from './ArtistPopFol';
import { useCookies } from 'react-cookie';
import { Artists } from '../interfaces/Artists';
import { Features } from '../interfaces/Features';
import { SongTempo } from '../interfaces/SongTempo';
import { AudioFeatures } from '../interfaces/AudioFeatures';
import { TPHistory } from '../interfaces/TrackPlayHistory';
import { RecentTracks } from '../interfaces/RecentTracks';
import { ArtistTop } from '../interfaces/ArtistTop';


function BasePage() {

  const [cookies] = useCookies(['access_token', 'refresh_token'])
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
  const [api, setApi] = useState<SpotifyAPI>(new SpotifyAPI(cookies.access_token || ""));


  useEffect(() => {
    console.log("Outside")
    if(cookies.access_token!=undefined){
      console.log("Inside")
      setApi(new SpotifyAPI(cookies.access_token));
      setIsLoggedIn(true);
    }
  }, [cookies])

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
    </div>
  );
}

export default BasePage;
