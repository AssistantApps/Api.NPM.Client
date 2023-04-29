import { expect, test } from '@jest/globals';
import { BaseApiService } from '../../baseApiService';
import { ITranslationImageController, translationImageController } from '../translationImage.controller';

export const translationImageEndpointTests = (
    apiService: () => BaseApiService,
    getTransKeyGuid: () => string,
) => () => {
    let controller: ITranslationImageController;

    beforeAll(async () => {
        controller = translationImageController(apiService());
    });

    test('get', async () => {
        const getAllResult = await controller.readAll(getTransKeyGuid());
        expect(getAllResult.isSuccess).toBeTruthy();
    });
};