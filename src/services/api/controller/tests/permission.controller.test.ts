import { expect, test } from '@jest/globals';
import { PermissionType } from '../../../../contracts/generated/Enum/permissionType';
import { BaseApiService } from '../../baseApiService';
import { IPermissionController, permissionController } from '../permission.controller';

export const permissionEndpointTests = (
    apiService: () => BaseApiService,
    getUserGuid: () => string
) => () => {
    let controller: IPermissionController;
    const permType = PermissionType.appManage;

    beforeAll(async () => {
        controller = permissionController(apiService());
    });

    test('get', async () => {
        const getAllResult = await controller.readCurrentUsersPermissions();
        expect(getAllResult.isSuccess).toBeTruthy();
        expect(getAllResult.value.length).toBeGreaterThan(0);
        expect(getAllResult.value.includes(permType)).toBeTruthy();
    });

    test('delete', async () => {
        const deleteResult = await controller.delPermissionForUser(getUserGuid(), permType);
        expect(deleteResult.isSuccess).toBeTruthy();
    });

    test('get x2', async () => {
        const getAllResult = await controller.readCurrentUsersPermissions();
        expect(getAllResult.isSuccess).toBeTruthy();
        expect(getAllResult.value.includes(permType)).toBeFalsy();
    });

    test('add', async () => {
        const addResult = await controller.addForUser(getUserGuid(), permType);
        expect(addResult.isSuccess).toBeTruthy();
    });
};