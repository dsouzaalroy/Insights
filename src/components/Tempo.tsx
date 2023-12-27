import { useEffect, useState } from "react";
import { Features } from "../interfaces/Features";

function Tempo({average, highest, lowest}: Features){
    const notations: TempoNotation[]= [
        new TempoNotation("Larghissimo","Lower than 20BPM", 19, 0),
        new TempoNotation("Solenne","From 20BPM to 40BPM", 20, 39),
        new TempoNotation("Largo","From 40BPM to 60BPM", 40, 59),
        new TempoNotation("Adagio","From 60BPM to 80BPM", 60, 79),
        new TempoNotation("Andante","From 80BPM to 100BPM", 80, 99),
        new TempoNotation("Moderato","From 100BPM to 120BPM", 100, 119),
        new TempoNotation("Allegro","From 120BPM to 170BPM", 120, 169),
        new TempoNotation("Vivace","From 170BPM to 200BPM", 170, 199),
        new TempoNotation("Prestissimo","Higher than 200BPM", 200, Infinity),

    ]

    const [tempoNotation, setTempoNotation] = useState<TempoNotation>(notations[0]);

    useEffect(() =>{
        computeTempoNotation();
    },[average])

    const computeTempoNotation = () =>{
        for(const i in notations){
            if((average>notations[i].upEnd)) setTempoNotation(notations[i]);
        }
    }

    // Larghissimo 20bpm or lower
    // Solenne 20 - 40bpm
    // Largo 40 - 60
    // Adagio 60 - 80
    // Andante - 80 to 100 BPM
    // Moderato - 100 to 120
    // Allegro - 120 to 168
    // Vivace - 168 to 200
    // Prestissimo - 200+
    return(


        (highest===null)? <div></div> :
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="p-5  flex flex-col border border-white rounded-2xl">
                <div className="py-3 text-5xl font-bold text-white">{tempoNotation.name}.</div>
                <div>
                    <div className="text-base">You usually listen to songs</div>
                    <div className="pb-2 text-lg text-center font-bold">{tempoNotation.description}</div>
                    <div className="flex flex-col gap-2">

                        <div className="flex flex-col">
                            <a href={highest.tpHist.track.external_urls.spotify} target='_blank' rel="noreferrer" className="flex flex-row justify-between"  >
                                <div className="flex flex-col gap-0">
                                    <div className="text-base">{highest.tpHist.track.name}</div>
                                    <div className="text-xs text-grey-1">{Math.round(highest.tempo)}BPM</div>
                                </div>
                                <div>
                                    <img src={highest.tpHist.track.album.images[0].url} className="w-20 h-20 hover:-translate-y-1 hover:scale-110" alt="High BPM song" />
                                </div>
                            </a>
                        </div>
                        <div className="flex flex-col pb-2">
                            <a href={lowest?.tpHist.track.external_urls.spotify} target='_blank' rel="noreferrer" className="flex flex-row justify-between" >
                                <div className="flex flex-col gap-0">
                                    <div className="text-base">{lowest?.tpHist.track.name}</div>
                                    <div className="text-xs text-grey-1">{Math.round(lowest?.tempo ?? 0)}BPM</div>
                                </div>
                                <div>
                                    <img src={lowest?.tpHist.track.album.images[0].url} className="w-20 h-20 hover:-translate-y-1 hover:scale-110" alt="High BPM song" />
                                </div>
                            </a>
                        </div>

                    </div>
                    

                </div>
            </div>
            <div className="flex md:flex-row flex-col gap-5">
                {/* <div className="flex flex-col  grow gap-2 px-3">
                    {notations.map(notat => {
                        return (
                        <div className={`flex flex-row justify-between py-1 ${(currentNotation===notat.name)?'rounded-lg bg-custom-grey':''}`}>
                            <div className="pl-5 ">{notat.name}</div>
                            <div className="pr-5 ">{notat.description}</div>
                        </div>
                        );
                    })}
                </div> */}
                <div className="flex flex-row">
                    <div>
                    {notations.map(notat => {
                        return (
                            <div className={`pl-5 py-1.5 text-base ${(tempoNotation.name===notat.name)?'rounded-l-xl bg-custom-grey font-semibold':'text-grey-1'}`}>{notat.name}</div>
                        );
                    })}
                    </div>
                    <div>
                    {notations.map(notat => {
                        return (
                            <div className={`pl-5 py-1.5 text-base ${(tempoNotation.name===notat.name)?'rounded-r-xl bg-custom-grey font-semibold':'text-grey-1'}`}>{notat.description}</div>
                        );
                    })}
                    </div>
                </div>
            </div>
        </div>
    )

}export default Tempo;

class TempoNotation{
    name: string
    description: string;
    upEnd: number;
    lowEnd: number;
  
    constructor(name:string, description:string, upEnd:number, lowEnd:number){
      this.upEnd = upEnd;
      this.lowEnd = lowEnd;
      this.description = description;
      this.name = name;
    }
  
  }

/*
    Largo - 40 to 60 BPM
    Adagio - 66 to 76 BPM
    Andante - 76 to 108 BPM
    Moderato - 108 to 120 BPM
    Allegro - 120 to 168 BPM
    Vivace - 168 to 176 BPM
    Presto - 168 to 200 BPM
    Prestissimo - 200+ BPM


    Larghissimo 20bpm or lower
    Solenne 20 - 40bpm
    Largo 40 - 60
    Adagio 60 - 80
    Andante - 80 to 100 BPM
    Moderato - 100 to 120
    Allegro - 120 to 168
    Vivace - 168 to 200
    Prestissimo - 200+


*/