import { endpoints } from "../../../constants/endpoints";
import { AppType } from "../../../contracts/generated/Enum/appType";
import { AppRatingViewModel } from "../../../contracts/generated/ViewModel/appRatingViewModel";
import { ResultWithValue } from "../../../contracts/result";
import { BaseApiService } from "../baseApiService";

export interface IAppReviewController {
    readForApp: (appType: AppType) => Promise<ResultWithValue<Array<AppRatingViewModel>>>;
}

const apiPath = endpoints.appReviews;

export const appReviewController = (service: BaseApiService): IAppReviewController => ({
    readForApp: (appType: AppType): Promise<ResultWithValue<Array<AppRatingViewModel>>> => {
        return service.get<Array<AppRatingViewModel>>(`${apiPath}/${appType}`);
    }
});