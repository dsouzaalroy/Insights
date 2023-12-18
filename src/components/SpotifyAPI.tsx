import axios, { AxiosInstance } from "axios";
import { AudioFeatures } from "../interfaces/AudioFeatures";
import { RecentTracks } from "../interfaces/RecentTracks";
import { TPHistory } from "../interfaces/TrackPlayHistory";
import { ArtistTop } from "../interfaces/ArtistTop";

export class SpotifyAPI {
    private token: string;

    constructor(token : string){
        this.token = token;
    }

    private api: AxiosInstance = axios.create({
        baseURL: "https://api.spotify.com/v1/"
    });

    // private digest = window.crypto.subtle.digest('SHA-256', this.generateRandomString(10));


    public async getTop(type: string, time_range: string, limit: number) : Promise<any>{

        let data  = {
            'time_range': time_range,
            'limit': limit.toString(),
        }
        let headers = {
            'Authorization': `Bearer ${this.token}`
        }

        const params = new URLSearchParams(data);

        await this.api.get(`me/top/${type}`, {params, headers})
        .then(response =>{
            return response;
        })
    }

    public async getTopArtists(time_range: string) : Promise<ArtistTop>{

        
        let data  = {
            'time_range': time_range,
            'limit': "50",
        }
        let headers = {
            'Authorization': `Bearer ${this.token}`
        }

        const params = new URLSearchParams(data);

        return this.api.get(`me/top/artists`, {params, headers})
        .then(response =>{
            return response.data;
        })
    }
    public async getRecents(limit: number): Promise<RecentTracks>{

        
        let data  = {
            'limit': limit.toString(),
        }
        let headers = {
            'Authorization': `Bearer ${this.token}`
        }

        const params = new URLSearchParams(data);


        return this.api.get(`me/player/recently-played`, {params, headers})
        .then(response =>{
            return(response.data)
        })

    }


    public async getAudioFeatures(tracks: string): Promise<AudioFeatures[]>{

        // const ids = tracks.items.map(tp => {return tp.track.id}).join(",")
        const ids = tracks

        let headers = {
            'Authorization': `Bearer ${this.token}`
        }

        return (await this.api.get(`/audio-features`,{params:{'ids':ids},headers})).data.audio_features

    }

    public async getArtists(artistIds: string){
        let headers = {
            'Authorization': `Bearer ${this.token}`
        }
        return (await this.api.get('/artists', {params:{'ids': artistIds}, headers})).data.artists
    }

    public async testToken(){
        await axios.get("http://localhost:8888/login").then((response) =>{
            console.log(response);
          })
    }

}

