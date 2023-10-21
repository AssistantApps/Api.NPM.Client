import { endpoints } from "../../../constants/endpoints";
import { VersionViewModel } from "../../../contracts/generated/ViewModel/Version/versionViewModel";
import { Result, ResultWithValue, ResultWithValueAndPagination } from "../../../contracts/result";
import { BaseApiService } from "../baseApiService";
import { PlatformType } from "../../../contracts/generated/Enum/platformType";
import { VersionSearchViewModel } from "../../../contracts/generated/ViewModel/Version/versionSearchViewModel";
import { anyObject } from "../../../helper/typescriptHacks";

export interface IVersionController {
    create: (item: VersionViewModel) => Promise<Result>;
    createSearch: (item: VersionSearchViewModel) => Promise<ResultWithValueAndPagination<Array<VersionViewModel>>>;
    createNotification: (winGuid: string) => Promise<Result>;
    readLatest: (appGuid: string, platforms: Array<PlatformType>) => Promise<ResultWithValue<VersionViewModel>>;
    readAllForAdmin: () => Promise<ResultWithValue<Array<VersionViewModel>>>;
    readAllHistory: (appGuid: string, langGuid: string, platforms?: Array<PlatformType>, page?: number) => Promise<ResultWithValue<Array<VersionViewModel>>>;
    update: (item: VersionViewModel) => Promise<Result>;
    del: (guid: string) => Promise<Result>;
}

const apiPath = endpoints.version;

export const versionController = (service: BaseApiService): IVersionController => ({
    create: (item: VersionViewModel): Promise<Result> => {
        return service.post<any, VersionViewModel>(
            apiPath, item,
            service.addAccessTokenToHeaders,
        );
    },
    createSearch: async (item: VersionSearchViewModel): Promise<ResultWithValueAndPagination<Array<VersionViewModel>>> => {
        const apiResult = await service.post<any, any>(
            `${apiPath}/Search`,
            item,
        );
        return apiResult.value as any;
    },
    createNotification: (winGuid: string): Promise<Result> => {
        return service.post(
            `${endpoints.versionSendUpdateNotification}/${winGuid}`,
            anyObject,
            service.addAccessTokenToHeaders,
        );
    },
    readLatest: (appGuid: string, platforms: Array<PlatformType>): Promise<ResultWithValue<VersionViewModel>> => {
        let queryPath = '';
        for (const queryParam in platforms) {
            if (queryParam == null || queryParam.length < 1) continue;
            if (queryPath.length > 0) {
                queryPath = queryPath + '&';
            }
            queryPath = queryPath + '=' + queryParam;
        }
        const url = `${apiPath}/${appGuid}?${queryPath}`;
        return service.get<VersionViewModel>(url);
    },
    readAllForAdmin: (): Promise<ResultWithValue<Array<VersionViewModel>>> => {
        return service.get<Array<VersionViewModel>>(
            `${apiPath}/Admin`,
            service.addAccessTokenToHeaders,
        );
    },
    readAllHistory: (appGuid: string, langGuid: string, platforms?: Array<PlatformType>, page?: number): Promise<ResultWithValue<Array<VersionViewModel>>> => {
        let url = `${apiPath}/${appGuid}/${langGuid}`;
        if (platforms != null) {
            let queryParamStr = '';
            for (const platform of platforms) {
                if (queryParamStr.length > 1) {
                    queryParamStr += '&';
                } else {
                    queryParamStr += '?';
                }
                queryParamStr += `platforms=${platform}`;
            }
            url += queryParamStr;
        }
        if (page != null) {
            if (url.includes('?')) {
                url += `?page=${page}`;
            } else {
                url += `&page=${page}`;
            }
        }
        return service.get<Array<VersionViewModel>>(
            url,
            service.addAccessTokenToHeaders,
        );
    },
    update: (item: VersionViewModel): Promise<Result> => {
        return service.put(
            apiPath, item,
            service.addAccessTokenToHeaders,
        );
    },
    del: (appGuid: string): Promise<Result> => {
        return service.delete(
            `${apiPath}/${appGuid}`,
            service.addAccessTokenToHeaders,
        );
    }
});
