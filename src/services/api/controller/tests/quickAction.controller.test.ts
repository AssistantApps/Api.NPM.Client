import { expect, test } from '@jest/globals';
import { BaseApiService } from '../../baseApiService';
import { IQuickActionController, quickActionController } from '../quickAction.controller';

export const quickActionEndpointTests = (apiService: () => BaseApiService) => () => {
    let controller: IQuickActionController;

    beforeAll(async () => {
        controller = quickActionController(apiService());
    });

    test('get', async () => {
        const getAllResult = await controller.readIndexes();
        expect(getAllResult.isSuccess).toBeTruthy();
    });

    test('exec', async () => {
        const createResult = await controller.regenerateIndexes();
        expect(createResult.isSuccess).toBeTruthy();
    });
};