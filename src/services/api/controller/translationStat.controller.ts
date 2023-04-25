import { endpoints } from "../../../constants/endpoints";
import { TranslationLeaderboardSearchViewModel } from "../../../contracts/generated/ViewModel/Translation/translationLeaderboardSearchViewModel";
import { TranslatorLeaderboardItemViewModel } from "../../../contracts/generated/ViewModel/Translation/translatorLeaderboardItemViewModel";
import { ResultWithValue } from "../../../contracts/result";
import { BaseApiService } from "../baseApiService";

export interface ITranslationStatController {
    readAll: (search: TranslationLeaderboardSearchViewModel) => Promise<ResultWithValue<Array<TranslatorLeaderboardItemViewModel>>>;
}

const apiPath = endpoints.translationStatLeaderboard;

export const translationStatController = (service: BaseApiService): ITranslationStatController => ({
    readAll: async (search: TranslationLeaderboardSearchViewModel): Promise<ResultWithValue<Array<TranslatorLeaderboardItemViewModel>>> => {
        const apiResult = await service.post<Array<TranslatorLeaderboardItemViewModel>, TranslationLeaderboardSearchViewModel>(
            apiPath, search,
            service.addAccessTokenToHeaders,
        );
        return {
            ...apiResult.value,
            isSuccess: true,
        } as any;
    },
});
