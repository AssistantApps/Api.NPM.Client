import { expect, test } from '@jest/globals';
import { uuidv4 } from '../../../../helper/guidHelper';
import { BaseApiService } from '../../baseApiService';
import { ILanguageController, languageController } from '../language.controller';

export const languageEndpointTests = (apiService: () => BaseApiService, getTransKeyGuid: () => string) => () => {
    let controller: ILanguageController;
    const newLanguageGuid: string = uuidv4();
    const langName: string = 'jest';

    beforeAll(async () => {
        controller = languageController(apiService());
    });

    test('get', async () => {
        const getAllResult = await controller.readAll();
        expect(getAllResult.isSuccess).toBeTruthy();
        expect(getAllResult.value.length).toBeGreaterThan(0);
    });

    test('create', async () => {
        const createResult = await controller.create({
            guid: newLanguageGuid,
            name: langName,
            languageCode: 'je',
            countryCode: 'je',
            translationKeyGuid: getTransKeyGuid(),
            sortOrder: 0,
            isVisible: true,
        });
        expect(createResult.isSuccess).toBeTruthy();
    });

    test('edit', async () => {
        const getAllResult = await controller.readAll();
        const currentItem = getAllResult.value.find(d => d.name == langName)!;
        const numItemsVisible = getAllResult.value.filter(item => item.isVisible).length;

        const updateResult = await controller.update({
            ...currentItem,
            isVisible: false,
        });
        expect(updateResult.isSuccess).toBeTruthy();

        const getAllResult2 = await controller.readAll();
        const newNumItemsVisible = getAllResult2.value.filter(item => item.isVisible).length;
        expect(numItemsVisible).toBe(newNumItemsVisible + 1);
    });

    test('delete', async () => {
        const getAllResult = await controller.readAll();
        const currentItem = getAllResult.value.find(d => d.name == langName)!;
        const deleteResult = await controller.del(currentItem.guid);
        expect(deleteResult.isSuccess).toBeTruthy();
    });
};