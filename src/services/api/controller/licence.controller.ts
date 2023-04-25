import { endpoints } from "../../../constants/endpoints";
import { AddLicenceViewModel } from "../../../contracts/generated/ViewModel/Licence/addLicenceViewModel";
import { LicenceViewModel } from "../../../contracts/generated/ViewModel/Licence/licenceViewModel";
import { Result, ResultWithValue } from "../../../contracts/result";
import { BaseApiService } from "../baseApiService";

export interface ILicenceController {
    create: (item: AddLicenceViewModel) => Promise<Result>;
    readAll: () => Promise<ResultWithValue<Array<LicenceViewModel>>>;
    activate: (appGuid: string, licence: string) => Promise<ResultWithValue<string>>;
    activateForPatron: (appGuid: string, licence: string) => Promise<ResultWithValue<string>>;
    verify: (appGuid: string, hash: string) => Promise<Result>;
    update: (item: LicenceViewModel) => Promise<Result>;
    del: (guid: string) => Promise<Result>;
}

const apiPath = endpoints.licence;

export const licenceController = (service: BaseApiService): ILicenceController => ({
    create: (item: AddLicenceViewModel): Promise<Result> => {
        return service.post<any, AddLicenceViewModel>(
            apiPath, item,
            service.addAccessTokenToHeaders,
        );
    },
    readAll: (): Promise<ResultWithValue<Array<LicenceViewModel>>> => {
        return service.get<Array<LicenceViewModel>>(
            apiPath,
            service.addAccessTokenToHeaders,
        );
    },
    activate: (appGuid: string, licence: string): Promise<ResultWithValue<string>> => {
        const url = `${endpoints.licenceActivate}/${appGuid}/${licence}`;
        return service.get<string>(url);
    },
    activateForPatron: (appGuid: string, licence: string): Promise<ResultWithValue<string>> => {
        const url = `${endpoints.licenceActivateForPatron}/${appGuid}/${licence}`;
        return service.get<string>(url);
    },
    verify: (appGuid: string, hash: string): Promise<Result> => {
        const url = `${endpoints.licenceVerify}/${appGuid}/${hash}`;
        return service.get<string>(url);
    },
    update: (item: LicenceViewModel): Promise<Result> => {
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
