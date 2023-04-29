import { expect, test } from '@jest/globals';
import { BaseApiService } from '../../baseApiService';
import { IDashboardController, dashboardController } from '../dashboard.controller';

export const dashboardEndpointTests = (apiService: () => BaseApiService) => () => {
    let controller: IDashboardController;

    beforeAll(async () => {
        controller = dashboardController(apiService());
    });

    test('public', async () => {
        const getAllResult = await controller.dashboard();
        expect(getAllResult.isSuccess).toBeTruthy();
        expect(getAllResult.value.length).toBeGreaterThan(0);
    });

    test('admin', async () => {
        const getAllResult = await controller.adminDashboard();
        expect(getAllResult.isSuccess).toBeTruthy();
        expect(getAllResult.value.length).toBeGreaterThan(0);
    });
};