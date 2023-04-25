import { endpoints } from "../../../constants/endpoints";
import { PatreonViewModel } from "../../../contracts/generated/ViewModel/patreonViewModel";
import { ResultWithValue } from "../../../contracts/result";
import { BaseApiService } from "../baseApiService";

export interface IOAuthController {
    patreon: (code: string, state: string) => Promise<ResultWithValue<Array<PatreonViewModel>>>;
}

const apiPath = endpoints.oAuth;

export const oAuthController = (service: BaseApiService): IOAuthController => ({
    patreon: (code: string, state: string): Promise<ResultWithValue<Array<PatreonViewModel>>> => {
        return service.get<Array<PatreonViewModel>>(
            `${apiPath}/Patreon?code=${code}&state=${state}`
        );
    },
});
