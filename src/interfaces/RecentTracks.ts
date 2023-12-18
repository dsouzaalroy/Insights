import { TPHistory } from "./TrackPlayHistory";

export interface RecentTracks{
    cursors : {
        after: string;
        before: string;
    } | null;
    href: string;
    items: TPHistory[]
    limit: number;
    next: string;
    total: number | null;

}