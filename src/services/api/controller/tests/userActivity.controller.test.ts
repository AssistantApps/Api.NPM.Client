import { expect, test } from '@jest/globals';
import { BaseApiService } from '../../baseApiService';
import { IUserActivityController, userActivityController } from '../userActivity.controller';

export const userActivityEndpointTests = (apiService: () => BaseApiService) => () => {
    let controller: IUserActivityController;

    beforeAll(async () => {
        controller = userActivityController(apiService());
    });

    test('get', async () => {
        const getAllResult = await controller.readAll();
        expect(getAllResult.isSuccess).toBeTruthy();
        expect(getAllResult.value.length).toBeGreaterThan(0);
    });
};