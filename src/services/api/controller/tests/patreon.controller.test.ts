import { expect, test } from '@jest/globals';
import { BaseApiService } from '../../baseApiService';
import { IPatreonController, patreonController } from '../patreon.controller';

export const patreonEndpointTests = (apiService: () => BaseApiService) => () => {
    let controller: IPatreonController;

    beforeAll(async () => {
        controller = patreonController(apiService());
    });

    test('get', async () => {
        const getAllResult = await controller.readAll();
        expect(getAllResult.isSuccess).toBeTruthy();
        expect(getAllResult.value.length).toBeGreaterThan(0);
    });
};