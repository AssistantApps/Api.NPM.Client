import { endpoints } from "../../../constants/endpoints";
import { IApiSearch } from "../../../contracts/apiObjects";
import { AppViewModel } from "../../../contracts/generated/ViewModel/appViewModel";
import { Result, ResultWithValue } from "../../../contracts/result";
import { BaseApiService } from "../baseApiService";

export interface IAppController {
    create: (item: AppViewModel) => Promise<Result>;
    readAll: () => Promise<ResultWithValue<Array<AppViewModel>>>;
    readAllForAdmin: (search?: IApiSearch) => Promise<ResultWithValue<Array<AppViewModel>>>;
    update: (item: AppViewModel) => Promise<Result>;
    del: (guid: string) => Promise<Result>;
}

const apiPath = endpoints.app;

export const appController = (service: BaseApiService): IAppController => ({
    create: (item: AppViewModel): Promise<Result> => {
        return service.post<any, AppViewModel>(
            apiPath, item,
            service.addAccessTokenToHeaders,
        );
    },
    readAll: (): Promise<ResultWithValue<Array<AppViewModel>>> => {
        return service.get<Array<AppViewModel>>(apiPath);
    },
    readAllForAdmin: (search?: IApiSearch): Promise<ResultWithValue<Array<AppViewModel>>> => {
        return service.get<Array<AppViewModel>>(
            `${apiPath}/Admin`,
            service.addAccessTokenToHeaders,
        );
    },
    update: (item: AppViewModel): Promise<Result> => {
        return service.put(
            apiPath, item,
            service.addAccessTokenToHeaders,
        );
    },
    del: (guid: string): Promise<Result> => {
        const url = `${apiPath}/${guid}`;
        return service.delete(url,
            service.addAccessTokenToHeaders,
        );
    }
});