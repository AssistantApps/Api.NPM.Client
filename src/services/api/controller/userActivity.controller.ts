import { endpoints } from "../../../constants/endpoints";
import { UserActivityViewModel } from "../../../contracts/generated/ViewModel/User/userActivityViewModel";
import { ResultWithValue } from "../../../contracts/result";
import { BaseApiService } from "../baseApiService";

export interface IUserActivityController {
    readAll: () => Promise<ResultWithValue<Array<UserActivityViewModel>>>;
}

const apiPath = endpoints.userActivity;

export const userActivityController = (service: BaseApiService): IUserActivityController => ({
    readAll: (): Promise<ResultWithValue<Array<UserActivityViewModel>>> => {
        return service.get<Array<UserActivityViewModel>>(
            apiPath,
            service.addAccessTokenToHeaders,
        );
    },
});