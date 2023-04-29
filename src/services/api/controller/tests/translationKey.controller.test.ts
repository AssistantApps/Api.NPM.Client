import { expect, test } from '@jest/globals';
import { uuidv4 } from '../../../../helper/guidHelper';
import { BaseApiService } from '../../baseApiService';
import { ITranslationKeyController, translationKeyController } from '../translationKey.controller';

export const translationKeyEndpointTests = (
    apiService: () => BaseApiService,
    getAppGuid: () => string,
) => () => {
    let controller: ITranslationKeyController;
    const translationKeyName: string = 'jest';
    const translationKeyNewName: string = 'jest-new';

    beforeAll(async () => {
        controller = translationKeyController(apiService());
    });

    test('get', async () => {
        const getAllResult = await controller.readAll();
        expect(getAllResult.isSuccess).toBeTruthy();
        expect(getAllResult.value.length).toBeGreaterThan(0);
    });

    test('create', async () => {
        const createResult = await controller.create({
            guid: uuidv4(),
            key: translationKeyName,
            appGuids: [getAppGuid()],
            meta: 'tester',
            original: 'testing tester',
            sortOrder: 0,
            isTranslatable: false,
        });
        expect(createResult.isSuccess).toBeTruthy();
        expect(createResult.value.length).toBeGreaterThan(5);
    });

    test('edit', async () => {
        const getAllResult = await controller.readAll();
        const currentItem = getAllResult.value.find(d => d.key == translationKeyName)!;

        const updateResult = await controller.update({
            ...currentItem,
            key: translationKeyNewName,
        });
        expect(updateResult.isSuccess).toBeTruthy();

        const getAllResult2 = await controller.readAll();
        const edittedItem = getAllResult2.value.find(d => d.key == translationKeyName)!;
        expect(edittedItem).toBeUndefined();
    });

    test('delete', async () => {
        const getAllResult = await controller.readAll();
        const currentItem = getAllResult.value.find(d => d.key == translationKeyNewName)!;
        const deleteResult = await controller.del(currentItem.guid);
        expect(deleteResult.isSuccess).toBeTruthy();
    });
};