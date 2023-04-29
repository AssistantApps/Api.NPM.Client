import { expect, test } from '@jest/globals';
import { BaseApiService } from '../../baseApiService';
import { ITranslationStatController, translationStatController } from '../translationStat.controller';

export const translationStatEndpointTests = (apiService: () => BaseApiService) => () => {
    let controller: ITranslationStatController;

    beforeAll(async () => {
        controller = translationStatController(apiService());
    });

    test('get', async () => {
        const getAllResult = await controller.readAll({
            apps: [],
            languages: []
        });
        expect(getAllResult.isSuccess).toBeTruthy();
        expect(getAllResult.value.length).toBeGreaterThan(0);
    });
};