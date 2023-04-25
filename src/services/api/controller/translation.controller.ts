import { endpoints } from "../../../constants/endpoints";
import { TranslationGetGraphViewModel } from "../../../contracts/generated/ViewModel/Translation/translationGetGraphViewModel";
import { TranslationSubmissionViewModel } from "../../../contracts/generated/ViewModel/Translation/translationSubmissionViewModel";
import { TranslationSubmittedDetailSearchViewModel } from "../../../contracts/generated/ViewModel/Translation/translationSubmittedDetailSearchViewModel";
import { TranslationSubmittedDetailViewModel } from "../../../contracts/generated/ViewModel/Translation/translationSubmittedDetailViewModel";
import { TranslationViewModel } from "../../../contracts/generated/ViewModel/Translation/translationViewModel";
import { TranslationsPerLanguageGraphViewModel } from "../../../contracts/generated/ViewModel/Translation/translationsPerLanguageGraphViewModel";
import { Result, ResultWithValue, ResultWithValueAndPagination } from "../../../contracts/result";
import { BaseApiService } from "../baseApiService";

export interface ITranslationController {
    create: (item: TranslationSubmissionViewModel) => Promise<Result>;
    createSearch: (search: TranslationSubmittedDetailSearchViewModel) => Promise<ResultWithValueAndPagination<Array<TranslationSubmittedDetailViewModel>>>;
    createSearchPerLanguage: (search: TranslationGetGraphViewModel) => Promise<ResultWithValue<Array<TranslationsPerLanguageGraphViewModel>>>;
    read: (transGuid: string) => Promise<ResultWithValue<TranslationViewModel>>;
    readForLang: (transGuid: string, langGuid: string) => Promise<ResultWithValue<Array<TranslationViewModel>>>;
    del: (guid: string) => Promise<Result>;
}

const apiPath = endpoints.translation;

export const translationController = (service: BaseApiService): ITranslationController => ({
    create: (item: TranslationSubmissionViewModel): Promise<Result> => {
        return service.post<any, TranslationSubmissionViewModel>(
            apiPath,
            item,
            service.addAccessTokenToHeaders,
        );
    },
    createSearch: async (search: TranslationSubmittedDetailSearchViewModel): Promise<ResultWithValueAndPagination<Array<TranslationSubmittedDetailViewModel>>> => {
        const apiResult = await service.post<Array<TranslationSubmittedDetailViewModel>, any>(
            endpoints.translationSearch,
            search,
            service.addAccessTokenToHeaders,
        );
        return apiResult.value as any;
    },
    createSearchPerLanguage: (search: TranslationGetGraphViewModel): Promise<ResultWithValue<Array<TranslationsPerLanguageGraphViewModel>>> => {
        return service.post<Array<TranslationsPerLanguageGraphViewModel>, any>(
            endpoints.translationSearchPerLanguage,
            search,
            service.addAccessTokenToHeaders,
        );
    },
    read: (transKeyGuid: string): Promise<ResultWithValue<TranslationViewModel>> => {
        return service.get<TranslationViewModel>(
            `${apiPath}/${transKeyGuid}`,
            service.addAccessTokenToHeaders,
        );
    },
    readForLang: (transGuid: string, langGuid: string): Promise<ResultWithValue<Array<TranslationViewModel>>> => {
        return service.get<Array<TranslationViewModel>>(
            `${apiPath}/${transGuid}/${langGuid}`,
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
