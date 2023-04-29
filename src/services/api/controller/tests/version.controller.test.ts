import { expect, test } from '@jest/globals';
import { uuidv4 } from '../../../../helper/guidHelper';
import { BaseApiService } from '../../baseApiService';
import { IVersionController, versionController } from '../version.controller';
import { PlatformType } from '../../../../contracts/generated/Enum/platformType';

export const versionEndpointTests = (
    apiService: () => BaseApiService,
    getAppGuid: () => string,
) => () => {
    let controller: IVersionController;
    const versionName: string = '1.0.jest';
    const versionNewName: string = '1.1.jest';

    beforeAll(async () => {
        controller = versionController(apiService());
    });

    test('get', async () => {
        const getAllResult = await controller.readAllForAdmin();
        expect(getAllResult.isSuccess).toBeTruthy();
        expect(getAllResult.value.length).toBeGreaterThan(0);
    });

    test('create', async () => {
        const createResult = await controller.create({
            guid: uuidv4(),
            appGuid: getAppGuid(),
            markdown: 'version details',
            buildName: versionName,
            buildNumber: 1,
            platforms: [PlatformType.api],
            activeDate: new Date(),
        });
        expect(createResult.isSuccess).toBeTruthy();
    });

    test('edit', async () => {
        const getAllResult = await controller.readAllForAdmin();
        const currentItem = getAllResult.value.find(d => d.buildName == versionName)!;

        const updateResult = await controller.update({
            ...currentItem,
            buildName: versionNewName,
        });
        expect(updateResult.isSuccess).toBeTruthy();

        const getAllResult2 = await controller.readAllForAdmin();
        const edittedItem = getAllResult2.value.find(d => d.buildName == versionName)!;
        expect(edittedItem).toBeUndefined();
    });

    test('delete', async () => {
        const getAllResult = await controller.readAllForAdmin();
        const currentItem = getAllResult.value.find(d => d.buildName == versionNewName)!;
        const deleteResult = await controller.del(currentItem.guid);
        expect(deleteResult.isSuccess).toBeTruthy();
    });
};