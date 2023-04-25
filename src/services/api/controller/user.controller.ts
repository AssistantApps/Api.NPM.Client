import { endpoints } from "../../../constants/endpoints";
import { IApiSearch } from "../../../contracts/apiObjects";
import { UserViewModel } from "../../../contracts/generated/ViewModel/User/userViewModel";
import { Result, ResultWithValue, ResultWithValueAndPagination } from "../../../contracts/result";
import { anyObject } from "../../../helper/typescriptHacks";
import { BaseApiService } from "../baseApiService";

export interface IUserController {
    readAll: () => Promise<ResultWithValue<Array<UserViewModel>>>;
    readAllAdmin: (item: IApiSearch) => Promise<ResultWithValueAndPagination<Array<UserViewModel>>>;
    update: (item: UserViewModel) => Promise<Result>;
    markAsAdmin: (guid: string) => Promise<Result>;
    del: (guid: string) => Promise<Result>;
}

const apiPath = endpoints.user;

export const userController = (service: BaseApiService): IUserController => ({
    readAll: (): Promise<ResultWithValue<Array<UserViewModel>>> => {
        return service.get<Array<UserViewModel>>(
            apiPath,
            service.addAccessTokenToHeaders,
        );
    },
    readAllAdmin: async (item: IApiSearch): Promise<ResultWithValueAndPagination<Array<UserViewModel>>> => {
        const apiResult = await service.post<any, IApiSearch>(
            apiPath, item,
            service.addAccessTokenToHeaders,
        );
        return apiResult.value;
    },
    update: (item: UserViewModel): Promise<Result> => {
        return service.put(
            apiPath, item,
            service.addAccessTokenToHeaders,
        );
    },
    markAsAdmin: (guid: string): Promise<Result> => {
        return service.put<any, any>(
            `${apiPath}/${guid}`,
            anyObject,
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