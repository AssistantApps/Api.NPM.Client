import { endpoints } from "../../../constants/endpoints";
import { TranslationReportAddViewModel } from "../../../contracts/generated/ViewModel/Translation/translationReportAddViewModel";
import { TranslationReportViewModel } from "../../../contracts/generated/ViewModel/Translation/translationReportViewModel";
import { Result, ResultWithValue } from "../../../contracts/result";
import { anyObject } from "../../../helper/typescriptHacks";
import { BaseApiService } from "../baseApiService";

export interface ITranslationReportController {
    create: (item: TranslationReportAddViewModel) => Promise<Result>;
    readAll: () => Promise<ResultWithValue<Array<TranslationReportViewModel>>>;
    resolve: (guid: string) => Promise<Result>;
    close: (guid: string) => Promise<Result>;
}

const apiPath = endpoints.translationReport;

export const translationReportController = (service: BaseApiService): ITranslationReportController => ({
    create: (item: TranslationReportAddViewModel): Promise<Result> => {
        return service.post<any, TranslationReportAddViewModel>(
            apiPath,
            item,
            service.addAccessTokenToHeaders,
        );
    },
    readAll: (): Promise<ResultWithValue<Array<TranslationReportViewModel>>> => {
        return service.get<Array<TranslationReportViewModel>>(
            apiPath,
            service.addAccessTokenToHeaders,
        );
    },
    resolve: (guid: string): Promise<Result> => {
        return service.put(
            `${apiPath}/${guid}`, anyObject,
            service.addAccessTokenToHeaders,
        );
    },
    close: (guid: string): Promise<Result> => {
        const url = `${apiPath}/${guid}`;
        return service.delete(
            url,
            service.addAccessTokenToHeaders,
        );
    }
});
