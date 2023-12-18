import { useEffect, useState } from "react";
import { RecentTracks } from "../interfaces/RecentTracks";
import { AudioFeatures } from "../interfaces/AudioFeatures";
import ScatterChartTimeMood from "./ScatterChartTimeMood";
import { Point } from "chart.js";

function TimeMood({tracks, audioFeatures}:{tracks:RecentTracks, audioFeatures: AudioFeatures[]}){

    const [timeAndMood, setTimeAndMood] = useState<Point[]>([]);
    useEffect(() =>{
        aggregateDateAndMood()
    },[tracks])


    const aggregateDateAndMood = () =>{
        const timeMoodList: Point[] = [];
        for(let i = 0; i<tracks.items.length; i++){
            const date: Date = new Date(tracks.items[i].played_at);
            const hour: number = date.getHours();
            const minutes: number = date.getMinutes() /60;
            const timeMood: Point = {
                x: hour + minutes,
                y: audioFeatures[i].valence,
            }
            timeMoodList[i] = timeMood;
        }
        setTimeAndMood(timeMoodList);
    }

    return (
        <div className="flex flex-col">
            <div className = "flex flex-col justify-center items-center">
                <header className="text-2xl font-bold">
                    Time to Mood
                </header>
                <p className="text-sm">
                    This chart plots the valence/mood of the song to the time it was listened to.
                    
                    Lower valence values correspond to
                    <span className="font-semibold text-blue"> Sad, Depressed, Angry </span> 
                    feelings whereas
                    <br/>
                    higher values correspond to
                    <span className="font-semibold text-yellow"> Happy, Cheerful, Euphoric </span>
                    feelings.

                </p>
            </div>

            <ScatterChartTimeMood dataIn = {timeAndMood}/>
        </div>
    );
}export default TimeMood;