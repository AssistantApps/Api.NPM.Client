import { endpoints } from "../../../constants/endpoints";
import { PermissionType } from "../../../contracts/generated/Enum/permissionType";
import { Result, ResultWithValue } from "../../../contracts/result";
import { anyObject } from "../../../helper/typescriptHacks";
import { BaseApiService } from "../baseApiService";

export interface IPermissionController {
    readCurrentUsersPermissions: () => Promise<ResultWithValue<Array<PermissionType>>>;
    readPermissionsForUserGuid: (userGuid: string) => Promise<ResultWithValue<Array<PermissionType>>>;
    addForUser: (userGuid: string, permissionType: PermissionType) => Promise<Result>;
    delPermissionForUser: (userGuid: string, permissionType: PermissionType) => Promise<Result>;
}

const apiPath = endpoints.permission;

export const permissionController = (service: BaseApiService): IPermissionController => ({
    readCurrentUsersPermissions: (): Promise<ResultWithValue<Array<PermissionType>>> => {
        return service.get<Array<PermissionType>>(
            apiPath,
            service.addAccessTokenToHeaders,
        );
    },
    readPermissionsForUserGuid: (userGuid: string): Promise<ResultWithValue<Array<PermissionType>>> => {
        return service.get<Array<PermissionType>>(
            `${apiPath}/${userGuid}`,
            service.addAccessTokenToHeaders,
        );
    },
    addForUser: (userGuid: string, permissionType: PermissionType): Promise<Result> => {
        return service.post(
            `${apiPath}/${userGuid}/${PermissionType[permissionType].toString()}`,
            anyObject,
            service.addAccessTokenToHeaders,
        );
    },
    delPermissionForUser: (userGuid: string, permissionType: PermissionType): Promise<Result> => {
        return service.delete(
            `${apiPath}/${userGuid}/${PermissionType[permissionType].toString()}`,
            service.addAccessTokenToHeaders,
        );
    }
});
