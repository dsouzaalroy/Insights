import { useEffect, useState } from "react";
import { GenreType } from "../interfaces/GenreType";
import { ArtistTop } from "../interfaces/ArtistTop";
import { SpotifyAPI } from "./SpotifyAPI";
import { Artists } from "../interfaces/Artists";
import BarChart from "./BarChart";


function Genres({week, month, year}:{week:ArtistTop, month: ArtistTop, year: ArtistTop}){

    const [artistsWeek, setArtistWeek] = useState<string>("");
    const [artistsMonth, setartistsMonth] = useState<string>("");
    const [artistsYear, setArtistYear] = useState<string>("");
    const [buttonState, setButtonState] = useState<string>("short")
    const [displayGenre, setDisplayGenre] = useState<string[]>([]);
    const [chartNum, setChartNum] = useState<number[]>([]);
    const [chartName, setChartName] = useState<string[]>([]);
    // 'https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=2'


    useEffect(() =>{
        if(week!==undefined){
            handleButtonClick("short");
        }
        
    },[week, month, year])

    const calculateTopGenre = (artists:ArtistTop)=>{
        const map:Map<string,number> = new Map();
        for(let i =0; i< artists.items.length;i++){
            let genres = artists.items[i].genres;
            for(let genre = 0; genre<genres.length;genre++){
                let count = map.get(genres[genre]);
                if(count!==undefined){
                    count+=1;
                    map.set(genres[genre], count);
                }else{
                    map.set(genres[genre], 1);
                }
            }
        }
        const sortedArray = Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
        const num: number[] = [];
        const name: string[] = [];
        for(let i =0; i< sortedArray.length; i++){
            num[i] = sortedArray[i][1];
            name[i] = sortedArray[i][0].charAt(0).toUpperCase() + sortedArray[i][0].slice(1);
        }
        setChartName(name);
        setChartNum(num);
        return sortedArray.slice(0,3).map((array) => {
            return array[0].charAt(0).toUpperCase() + array[0].slice(1);
            });
    }

    const handleButtonClick = (timeline: string) =>{
        setButtonState(timeline);
        switch (timeline){
            case "short":
                setDisplayGenre(calculateTopGenre(week));
                break
            case "med":
                setDisplayGenre(calculateTopGenre(month));
                break
            case "long":
                setDisplayGenre(calculateTopGenre(year));
                break;
            default:
                setDisplayGenre([]);
                break;
        }
    } 
    const defaultButtonStyling = "rounded-full px-4 py-2 text-base"
    const buttonSelected = "bg-green text-white "+ defaultButtonStyling;
    const buttonDeselected = "bg-light-grey text-grey-1 hover:-translate-y-1 hover:scale-110 " + defaultButtonStyling;

    return (
        <div>
            <header className="flex text-2xl font-bold justify-center pb-10">
            Genre Distribution
            </header>
            <div className="flex flex-col justify-center">
                <div className="flex justify-center gap-5">
                    <button
                    className={`${buttonState === "short" ? buttonSelected : buttonDeselected} `}
                    onClick={() => handleButtonClick("short")}
                    >
                    Short Term
                    </button>
                    <button
                    className={`${buttonState === "med" ? buttonSelected : buttonDeselected}`}
                    onClick={() => handleButtonClick("med")}
                    >
                    Medium Term
                    </button>
                    <button
                    className={`${buttonState === "long" ? buttonSelected : buttonDeselected}`}
                    onClick={() => handleButtonClick("long")}
                    >
                    Long Term
                    </button>
                </div>
            </div>
            <BarChart num={chartNum} name={chartName}></BarChart>
        </div>
          

    )
} export default Genres;