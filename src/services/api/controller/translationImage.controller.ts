import { endpoints } from "../../../constants/endpoints";
import { TranslationImageViewModel } from "../../../contracts/generated/ViewModel/Translation/translationImageViewModel";
import { Result, ResultWithValue } from "../../../contracts/result";
import { BaseApiService } from "../baseApiService";

export interface ITranslationImageController {
    add: (guid: string, fileName: any, data: any) => Promise<Result>;
    readAll: (guid: string) => Promise<ResultWithValue<Array<TranslationImageViewModel>>>;
    del: (guid: string) => Promise<Result>;
}

const apiPath = endpoints.translationImage;

export const translationImageController = (service: BaseApiService): ITranslationImageController => ({
    add: (guid: string, fileName: any, data: any): Promise<Result> => {
        return service.post<any, any>(
            `${apiPath}/${guid}`,
            {
                Name: fileName,
                Data: data,
            },
            service.addAccessTokenToHeaders,
        );
    },
    readAll: (guid: string): Promise<ResultWithValue<Array<TranslationImageViewModel>>> => {
        return service.get<Array<TranslationImageViewModel>>(
            `${apiPath}/${guid}`,
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
