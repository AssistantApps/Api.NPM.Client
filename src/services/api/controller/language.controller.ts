import { endpoints } from "../../../constants/endpoints";
import { LanguageViewModel } from "../../../contracts/generated/ViewModel/languageViewModel";
import { Result, ResultWithValue } from "../../../contracts/result";
import { BaseApiService } from "../baseApiService";

export interface ILanguageController {
    create: (item: LanguageViewModel) => Promise<Result>;
    readAll: () => Promise<ResultWithValue<Array<LanguageViewModel>>>;
    update: (item: LanguageViewModel) => Promise<Result>;
    del: (guid: string) => Promise<Result>;
}

const apiPath = endpoints.language;

export const languageController = (service: BaseApiService): ILanguageController => ({
    create: (item: LanguageViewModel): Promise<Result> => {
        return service.post<any, LanguageViewModel>(
            apiPath, item,
            service.addAccessTokenToHeaders,
        );
    },
    readAll: (): Promise<ResultWithValue<Array<LanguageViewModel>>> => {
        return service.get<Array<LanguageViewModel>>(apiPath);
    },
    update: (item: LanguageViewModel): Promise<Result> => {
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
