import { expect, test } from '@jest/globals';
import { BaseApiService } from '../../baseApiService';
import { ITranslationController, translationController } from '../translation.controller';

export const translationEndpointTests = (
    apiService: () => BaseApiService,
    getTransGuid: () => string,
    getTranslationKeyGuid: () => string,
    getAppGuid: () => string,
    getLangGuid: () => string,
) => () => {
    let controller: ITranslationController;
    const translationText: string = 'jest';

    beforeAll(async () => {
        controller = translationController(apiService());
    });

    test('get', async () => {
        const getAllResult = await controller.read(getTransGuid());
        expect(getAllResult.isSuccess).toBeTruthy();
    });

    test('get by lang', async () => {
        const getAllResult = await controller.readForLang(getTranslationKeyGuid(), getLangGuid());
        expect(getAllResult.isSuccess).toBeTruthy();
        expect(getAllResult.value.length).toBeGreaterThan(0);
    });

    test('get graph', async () => {
        const getAllResult = await controller.createSearchPerLanguage({
            appGuidList: [getAppGuid()],
        });
        expect(getAllResult.isSuccess).toBeTruthy();
        expect(getAllResult.value.length).toBeGreaterThan(0);
    });

    test('create', async () => {
        const createResult = await controller.create({
            translationKeyGuid: getTranslationKeyGuid(),
            languageGuid: getLangGuid(),
            text: translationText,
        });
        expect(createResult.isSuccess).toBeTruthy();
    });

    test('create search', async () => {
        const getAllResult = await controller.createSearch({
            searchText: translationText,
            page: 1,
        });
        expect(getAllResult.isSuccess).toBeTruthy();
        expect(getAllResult.value.length).toBeGreaterThan(0);
    });

    test('delete', async () => {
        const getAllResult = await controller.readForLang(getTranslationKeyGuid(), getLangGuid());
        const currentItem = getAllResult.value.find(d => d.text == translationText)!;
        const deleteResult = await controller.del(currentItem.guid);
        expect(deleteResult.isSuccess).toBeTruthy();
    });
};