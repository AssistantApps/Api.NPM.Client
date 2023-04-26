import { AppType } from "./generated/Enum/appType";
import { SteamBranchItemViewModel } from "./generated/ViewModel/Steam/steamBranchItemViewModel";

export interface IApiSearch {
    page?: number;
    searchText?: string;
}


export interface IUserLogin {
    userGuid: string;
    username: string;
    profilePic: string;
    token: string;
    tokenExpiry: string;
    tokenExpiryDate: Date;
}


export interface ISteamBranchRow {
    appType: AppType;
    branches: Array<SteamBranchItemViewModel>;
}