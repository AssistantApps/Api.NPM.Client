import { expect, test } from '@jest/globals';
import { AppType } from '../../../../contracts/generated/Enum/appType';
import { PlatformType } from '../../../../contracts/generated/Enum/platformType';
import { BaseApiService } from '../../baseApiService';
import { IBadgeController, badgeController } from '../badge.controller';

export const badgeEndpointTests = (
    apiService: () => BaseApiService,
    appGuid: () => string
) => () => {
    let controller: IBadgeController;

    beforeAll(async () => {
        controller = badgeController(apiService());
    });

    test('reviews.svg', async () => {
        const getAllResult = await controller.reviews(AppType.nms, PlatformType.android.toString());
        expect(getAllResult.isSuccess).toBeTruthy();
    });

    test('version.svg', async () => {
        const getAllResult = await controller.version(appGuid());
        expect(getAllResult.isSuccess).toBeTruthy();
    });
};