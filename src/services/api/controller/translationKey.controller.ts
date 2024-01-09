import { endpoints } from "../../../constants/endpoints";
import { TranslationKeySearchDropdownViewModel } from "../../../contracts/generated/ViewModel/Translation/translationKeySearchDropdownViewModel";
import { TranslationKeyViewModel } from "../../../contracts/generated/ViewModel/Translation/translationKeyViewModel";
import { TranslationSearchViewModel } from "../../../contracts/generated/ViewModel/Translation/translationSearchViewModel";
import { Result, ResultWithValue } from "../../../contracts/result";
import { BaseApiService } from "../baseApiService";

export interface ITranslationKeyController {
    create: (item: TranslationKeyViewModel) => Promise<ResultWithValue<string>>;
    createSearch: (search: TranslationSearchViewModel) => Promise<ResultWithValue<Array<TranslationKeyViewModel>>>;
    createSearchDropdown: (search: TranslationSearchViewModel) => Promise<ResultWithValue<Array<TranslationKeySearchDropdownViewModel>>>;
    read: (guid: string) => Promise<ResultWithValue<TranslationKeyViewModel>>;
    readAll: () => Promise<ResultWithValue<Array<TranslationKeyViewModel>>>;
    update: (item: TranslationKeyViewModel) => Promise<Result>;
    del: (guid: string) => Promise<Result>;
}

const apiPath = endpoints.translationKey;

export const translationKeyController = (service: BaseApiService): ITranslationKeyController => ({
    create: (item: TranslationKeyViewModel): Promise<ResultWithValue<string>> => {
        return service.post<string, TranslationKeyViewModel>(
            apiPath,
            item,
            service.addAccessTokenToHeaders,
        );
    },
    createSearch: (search: TranslationSearchViewModel): Promise<ResultWithValue<Array<TranslationKeyViewModel>>> => {
        return service.post<Array<TranslationKeyViewModel>, any>(
            `${apiPath}/Search`,
            search,
            service.addAccessTokenToHeaders,
        );
    },
    createSearchDropdown: (search: TranslationSearchViewModel): Promise<ResultWithValue<Array<TranslationKeySearchDropdownViewModel>>> => {
        return service.post<Array<TranslationKeySearchDropdownViewModel>, any>(
            endpoints.translationKeySearchDropdown,
            search,
            service.addAccessTokenToHeaders,
        );
    },
    read: (guid: string): Promise<ResultWithValue<TranslationKeyViewModel>> => {
        return service.get<TranslationKeyViewModel>(
            `${apiPath}/${guid}`,
            service.addAccessTokenToHeaders,
        );
    },
    readAll: (): Promise<ResultWithValue<Array<TranslationKeyViewModel>>> => {
        return service.get<Array<TranslationKeyViewModel>>(
            `${apiPath}/Admin`,
            service.addAccessTokenToHeaders,
        );
    },
    update: (item: TranslationKeyViewModel): Promise<Result> => {
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
