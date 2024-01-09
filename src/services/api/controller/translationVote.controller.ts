import { endpoints } from "../../../constants/endpoints";
import { TranslationVoteViewModel } from "../../../contracts/generated/ViewModel/Translation/translationVoteViewModel";
import { Result, ResultWithValue } from "../../../contracts/result";
import { BaseApiService } from "../baseApiService";

export interface ITranslationVoteController {
    create: (item: TranslationVoteViewModel) => Promise<Result>;
    read: (guid: string) => Promise<ResultWithValue<TranslationVoteViewModel>>;
    update: (item: TranslationVoteViewModel) => Promise<Result>;
    del: (item: TranslationVoteViewModel) => Promise<Result>;
}

const apiPath = endpoints.translationVote;

export const translationVoteController = (service: BaseApiService): ITranslationVoteController => ({
    create: (item: TranslationVoteViewModel): Promise<Result> => {
        return service.post<any, TranslationVoteViewModel>(
            apiPath,
            item,
            service.addAccessTokenToHeaders,
        );
    },
    read: (guid: string): Promise<ResultWithValue<TranslationVoteViewModel>> => {
        return service.get<TranslationVoteViewModel>(
            `${apiPath}/${guid}`,
            service.addAccessTokenToHeaders,
        );
    },
    update: (item: TranslationVoteViewModel): Promise<Result> => {
        return service.put(
            apiPath, item,
            service.addAccessTokenToHeaders
        );
    },
    del: (item: TranslationVoteViewModel): Promise<Result> => {
        return service.delete(apiPath, () => ({
            ...service.addAccessTokenToHeaders(),
            data: item,
        }));
    }
});
