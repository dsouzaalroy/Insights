import { useEffect, useState } from "react";
import { Artists } from "../interfaces/Artists";
import ScatterChartPopFol from "./ScatterChartPopFol";

function ArtistPopFol(
    {week, month, year, recent}:{
    week:Artists[],
    month:Artists[],
    year:Artists[],
    recent:Artists[]}){

    const [buttonState, setButtonState] = useState<String>("short");
    const [displayTimeline, setDisplayTimeline] = useState<Artists[]>([])

    useEffect(() =>{

        if(week)handleButtonClick("short");

    }, [week])

    const handleButtonClick = (timeline: String) =>{
        setButtonState(timeline);
        switch (timeline){
            case "short":
                setDisplayTimeline(week);
                break
            case "med":
                setDisplayTimeline(month);
                break
            case "long":
                setDisplayTimeline(year);
                break;
            case "recent":
                setDisplayTimeline(recent);
                break;
            default:
                setDisplayTimeline([]);
                break;
        }
    } 

    const defaultButtonStyling = "rounded-full px-4 py-2 text-base"
    const buttonSelected = "bg-green text-white "+ defaultButtonStyling;
    const buttonDeselected = "bg-light-grey text-grey-1 hover:-translate-y-1 hover:scale-110 " + defaultButtonStyling;

    return(
        <div className="flex flex-col">
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
                    <button
                    className={`${buttonState === "recent" ? buttonSelected : buttonDeselected}`}
                    onClick={() => handleButtonClick("recent")}
                    >
                    Recent
                    </button>
                    
                </div>
                <div>
                </div>
            <ScatterChartPopFol dataIn={displayTimeline}/>

        </div>
    )

}export default ArtistPopFol;