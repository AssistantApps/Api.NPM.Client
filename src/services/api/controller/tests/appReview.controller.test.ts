import { expect, test } from '@jest/globals';
import { AppType } from '../../../../contracts/generated/Enum/appType';
import { BaseApiService } from '../../baseApiService';
import { IAppReviewController, appReviewController } from '../appReview.controller';

export const appReviewEndpointTests = (apiService: () => BaseApiService) => () => {
    let controller: IAppReviewController;

    beforeAll(async () => {
        controller = appReviewController(apiService());
    });

    test('get', async () => {
        const getAllResult = await controller.readForApp(AppType.nms);
        expect(getAllResult.isSuccess).toBeTruthy();
        expect(getAllResult.value.length).toBeGreaterThan(0);
    });
};

/*

Setup AppReview

SET 'AssistantApps-NMS-AppRatingGooglePlay' '{"app":"NMS","type":"GooglePlayStore","numberOfReviews":2583,"allScore":4.8,"version":"2.11"}'

*/

