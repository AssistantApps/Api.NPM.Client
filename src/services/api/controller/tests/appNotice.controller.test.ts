import { expect, test } from '@jest/globals';
import { uuidv4 } from '../../../../helper/guidHelper';
import { BaseApiService } from '../../baseApiService';
import { IAppNoticeController, appNoticeController } from '../appNotice.controller';
import { PlatformType } from '../../../../contracts/generated/Enum/platformType';

export const appNoticeEndpointTests = (apiService: () => BaseApiService, appGuid: () => string) => () => {
    let controller: IAppNoticeController;
    let newAppNoticeGuid: string = uuidv4();

    beforeAll(async () => {
        controller = appNoticeController(apiService());
    });

    test('get', async () => {
        const getAllResult = await controller.readAll(appGuid(), 'en');
        expect(getAllResult.isSuccess).toBeTruthy();
    });

    test('create', async () => {
        const createResult = await controller.create({
            guid: newAppNoticeGuid,
            appGuid: appGuid(),
            name: 'AppNotice from jest',
            subtitle: 'subtitle',
            iconUrl: 'icon.png',
            externalUrl: '',
            languageCode: 'en',
            platforms: [PlatformType.android],
            isVisible: true,
            endDate: new Date(),
            sortOrder: 0,
        });
        expect(createResult.isSuccess).toBeTruthy();
    });

    test('edit', async () => {
        const getAllResult = await controller.readAllForAdmin();
        const itemsThatAreVisible = getAllResult.value.filter(a => a.isVisible).length;

        const currentItem = getAllResult.value.find(a => a.guid == newAppNoticeGuid)!;
        const updateResult = await controller.update({
            ...currentItem,
            isVisible: false,
        });
        expect(updateResult.isSuccess).toBeTruthy();

        const getAllResult2 = await controller.readAllForAdmin();
        const itemsThatAreVisible2 = getAllResult2.value.filter(a => a.isVisible).length;
        expect(itemsThatAreVisible).toBeGreaterThan(itemsThatAreVisible2);
    });

    test('delete', async () => {
        const createResult = await controller.del(newAppNoticeGuid);
        expect(createResult.isSuccess).toBeTruthy();
    });
};