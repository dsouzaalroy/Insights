import { SongTempo } from "./SongTempo";

  export interface Features{
    average:number,
    highest: SongTempo | null,
    lowest: SongTempo | null,
  }
