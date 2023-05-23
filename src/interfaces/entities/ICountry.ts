import { continentsCodes } from "../../enums/continentsCodes";

export interface ICountry {
    id: number;
    code: string;
    name: string;
    emoji: string;
    continentCode: continentsCodes;
}
