import { expect, test } from '@jest/globals';
import { AppType } from '../../../../contracts/generated/Enum/appType';
import { BaseApiService } from '../../baseApiService';
import { ISteamController, steamController } from '../steam.controller';

export const steamEndpointTests = (apiService: () => BaseApiService) => () => {
    let controller: ISteamController;

    beforeAll(async () => {
        controller = steamController(apiService());
    });

    describe('News', () => {
        test('get', async () => {
            const getAllResult = await controller.readNews(AppType.nms.toString());
            expect(getAllResult.isSuccess).toBeTruthy();
            expect(getAllResult.value.length).toBeGreaterThan(0);
        });
    });

    describe('Branches', () => {
        test('get', async () => {
            const getAllResult = await controller.readBranch(AppType.nms.toString());
            expect(getAllResult.isSuccess).toBeTruthy();
        });

        test('update', async () => {
            const getAllResult = await controller.readBranch(AppType.nms.toString());
            const nmsBranch = getAllResult.value;

            const updateResult = await controller.updateBranch(
                AppType.nms.toString(), {
                ...nmsBranch,
                branches: [
                    ...nmsBranch.branches.slice(0, nmsBranch.branches.length - 1),
                    {
                        ...nmsBranch.branches[0],
                        lastUpdate: new Date(),
                    }
                ]
            });
            expect(updateResult.isSuccess).toBeTruthy();
        });
    });
};