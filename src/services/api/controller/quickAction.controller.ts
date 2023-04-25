import { endpoints } from "../../../constants/endpoints";
import { RegenerateIndexViewModel } from "../../../contracts/generated/ViewModel/regenerateIndexViewModel";
import { Result, ResultWithValue } from "../../../contracts/result";
import { anyObject } from "../../../helper/typescriptHacks";
import { BaseApiService } from "../baseApiService";

export interface IQuickActionController {
    readIndexes: () => Promise<ResultWithValue<Array<RegenerateIndexViewModel>>>;
    regenerateIndexes: () => Promise<Result>;
}

const apiPath = endpoints.quickActionIndexes;

export const quickActionController = (service: BaseApiService): IQuickActionController => ({
    readIndexes: (): Promise<ResultWithValue<Array<RegenerateIndexViewModel>>> => {
        return service.get<Array<RegenerateIndexViewModel>>(
            apiPath,
            service.addAccessTokenToHeaders,
        );
    },
    regenerateIndexes: (): Promise<Result> => {
        return service.post<any, any>(
            apiPath, anyObject,
            service.addAccessTokenToHeaders,
        );
    },
});
