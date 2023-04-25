import { endpoints } from "../../../constants/endpoints";
import { AppType } from "../../../contracts/generated/Enum/appType";
import { ResultWithValue } from "../../../contracts/result";
import { BaseApiService } from "../baseApiService";

export interface IBadgeController {
    reviews: (appType: AppType, platform: string) => Promise<ResultWithValue<string>>;
    version: (appGuid: string) => Promise<ResultWithValue<string>>;
}

const apiPath = endpoints.badge;

export const badgeController = (service: BaseApiService): IBadgeController => ({
    reviews: (appType: AppType, platform: string): Promise<ResultWithValue<string>> => {
        return service.get<string>(`${apiPath}/${appType}/${platform}`);
    },
    version: (appGuid: string): Promise<ResultWithValue<string>> => {
        return service.get<string>(`${apiPath}/${appGuid}`);
    }
});