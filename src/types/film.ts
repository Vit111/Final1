import { ScheduleType } from "./schedule";
import { NetworkType } from "./network";


export type FilmType = {
    id: number;
    url: string;
    name: string;
    type: string;
    language: string;
    genres: string[];
    status: string;
    runtime: number;
    averageRuntime: number;
    premiered: string;
    ended: string;
    officialSite: string;
    schedule: ScheduleType;
    rating: {
        average: number
    };
    weight: number;
    network: NetworkType;
    image: {
        medium: string;
        original: string;
    };
}
