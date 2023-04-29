import { expect, test } from '@jest/globals';
import { BaseApiService } from '../../baseApiService';
import { ICacheController, cacheController } from '../cache.controller';

export const cacheEndpointTests = (apiService: () => BaseApiService) => () => {
    let controller: ICacheController;

    beforeAll(async () => {
        controller = cacheController(apiService());
    });

    test('read all cache', async () => {
        const getAllResult = await controller.readAllCache();
        expect(getAllResult.isSuccess).toBeTruthy();
        expect(getAllResult.value.length).toBeGreaterThan(0);
    });

    test('del all cache', async () => {
        const delAllResult = await controller.delAllCache();
        expect(delAllResult.isSuccess).toBeTruthy();
    });

    test('read all cache - should be empty', async () => {
        const getAllResult = await controller.readAllCache();
        expect(getAllResult.isSuccess).toBeTruthy();
        expect(getAllResult.value.length).toBe(0);
    });

    // Redis

    test('read all redisCache', async () => {
        const getAllResult = await controller.readAllRedisCache();
        expect(getAllResult.isSuccess).toBeTruthy();
    });
};