import { Track } from "./Track";

export interface TPHistory{
    played_at: string;
    track: Track
    context: string | null;
}