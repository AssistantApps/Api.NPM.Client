import { endpoints } from "../../../constants/endpoints";
import { IApiSearch } from "../../../contracts/apiObjects";
import { AppNoticeViewModel } from "../../../contracts/generated/ViewModel/appNoticeViewModel";
import { Result, ResultWithValue } from "../../../contracts/result";
import { BaseApiService } from "../baseApiService";

export interface IAppNoticeController {
    create: (item: AppNoticeViewModel) => Promise<Result>;
    readAll: (appGuid: string, langCode: string) => Promise<ResultWithValue<Array<AppNoticeViewModel>>>;
    readAllForAdmin: (search?: IApiSearch) => Promise<ResultWithValue<Array<AppNoticeViewModel>>>;
    update: (item: AppNoticeViewModel) => Promise<Result>;
    del: (guid: string) => Promise<Result>;
}

const apiPath = endpoints.appNotice;

export const appNoticeController = (service: BaseApiService): IAppNoticeController => ({
    create: (item: AppNoticeViewModel): Promise<Result> => {
        return service.post<any, AppNoticeViewModel>(
            apiPath, item,
            service.addAccessTokenToHeaders,
        );
    },
    readAll: (appGuid: string, langCode: string): Promise<ResultWithValue<Array<AppNoticeViewModel>>> => {
        return service.get<Array<AppNoticeViewModel>>(`${apiPath}/${appGuid}/${langCode}`);
    },
    readAllForAdmin: (search?: IApiSearch): Promise<ResultWithValue<Array<AppNoticeViewModel>>> => {
        return service.get<Array<AppNoticeViewModel>>(
            `${apiPath}/Admin`,
            service.addAccessTokenToHeaders,
        );
    },
    update: (item: AppNoticeViewModel): Promise<Result> => {
        return service.put(
            apiPath, item,
            service.addAccessTokenToHeaders,
        );
    },
    del: (guid: string): Promise<Result> => {
        const url = `${apiPath}/${guid}`;
        return service.delete(
            url,
            service.addAccessTokenToHeaders,
        );
    }
});