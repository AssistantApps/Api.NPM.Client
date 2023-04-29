import { expect, test } from '@jest/globals';
import { uuidv4 } from '../../../../helper/guidHelper';
import { BaseApiService } from '../../baseApiService';
import { IAppController, appController } from '../app.controller';

export const appEndpointTests = (apiService: () => BaseApiService) => () => {
    let controller: IAppController;
    let newAppGuid: string = uuidv4();

    beforeAll(async () => {
        controller = appController(apiService());
    });

    test('get', async () => {
        const getAllResult = await controller.readAll();
        expect(getAllResult.isSuccess).toBeTruthy();
        expect(getAllResult.value.length).toBeGreaterThan(3);
    });

    test('create', async () => {
        const createResult = await controller.create({
            guid: newAppGuid,
            name: 'App from jest',
            gameName: 'Jest',
            iconUrl: 'icon.png',
            logoUrl: 'logo.png',
            isVisible: true,
            sortOrder: 0,
        });
        expect(createResult.isSuccess).toBeTruthy();
    });

    test('edit', async () => {
        const getAllResult = await controller.readAllForAdmin();
        const appsThatAreVisible = getAllResult.value.filter(a => a.isVisible).length;

        const currentApp = getAllResult.value.find(a => a.guid == newAppGuid)!;
        const updateResult = await controller.update({
            ...currentApp,
            isVisible: false,
        });
        expect(updateResult.isSuccess).toBeTruthy();

        const getAllResult2 = await controller.readAllForAdmin();
        const appsThatAreVisible2 = getAllResult2.value.filter(a => a.isVisible).length;
        expect(appsThatAreVisible).toBeGreaterThan(appsThatAreVisible2);
    });

    test('delete', async () => {
        const createResult = await controller.del(newAppGuid);
        expect(createResult.isSuccess).toBeTruthy();
    });
};