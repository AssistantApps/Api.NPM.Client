import { expect, test } from '@jest/globals';
import { BaseApiService } from '../../baseApiService';
import { IUserController, userController } from '../user.controller';

export const userEndpointTests = (apiService: () => BaseApiService) => () => {
    let controller: IUserController;
    const userName: string = 'kurt';

    beforeAll(async () => {
        controller = userController(apiService());
    });

    test('get', async () => {
        const getAllResult = await controller.readAll();
        expect(getAllResult.isSuccess).toBeTruthy();
        expect(getAllResult.value.length).toBeGreaterThan(0);
    });

    test('get for admin', async () => {
        const createResult = await controller.readAllAdmin({
            searchText: userName,
            page: 1,
        });
        expect(createResult.isSuccess).toBeTruthy();
    });
};