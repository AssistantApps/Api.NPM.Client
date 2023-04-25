import { endpoints } from "../../../constants/endpoints";
import { PatreonViewModel } from "../../../contracts/generated/ViewModel/patreonViewModel";
import { Result, ResultWithValue } from "../../../contracts/result";
import { BaseApiService } from "../baseApiService";

export interface IPatreonController {
    readAll: () => Promise<ResultWithValue<Array<PatreonViewModel>>>;
}

const apiPath = endpoints.patreon;

export const patreonController = (service: BaseApiService): IPatreonController => ({
    readAll: (): Promise<ResultWithValue<Array<PatreonViewModel>>> => {
        return service.get<Array<PatreonViewModel>>(
            apiPath,
            service.addAccessTokenToHeaders,
        );
    },
});
