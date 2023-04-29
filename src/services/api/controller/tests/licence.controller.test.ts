import { expect, test } from '@jest/globals';
import { uuidv4 } from '../../../../helper/guidHelper';
import { BaseApiService } from '../../baseApiService';
import { ILicenceController, licenceController } from '../licence.controller';

export const licenceEndpointTests = (
    apiService: () => BaseApiService,
    getAppGuid: () => string,
) => () => {
    let controller: ILicenceController;
    const licenceName: string = 'jest';
    const licenceNewName: string = 'jest-new';
    let licenceHash: string;

    beforeAll(async () => {
        controller = licenceController(apiService());
    });

    test('get', async () => {
        const getAllResult = await controller.readAll();
        expect(getAllResult.isSuccess).toBeTruthy();
        expect(getAllResult.value.length).toBeGreaterThan(0);
    });

    test('create', async () => {
        const createResult = await controller.create({
            guid: uuidv4(),
            appGuid: getAppGuid(),
            name: licenceName,
        });
        expect(createResult.isSuccess).toBeTruthy();
    });

    test('edit', async () => {
        const getAllResult = await controller.readAll();
        const currentItem = getAllResult.value.find(d => d.name == licenceName)!;

        const updateResult = await controller.update({
            ...currentItem,
            name: licenceNewName,
        });
        expect(updateResult.isSuccess).toBeTruthy();

        const getAllResult2 = await controller.readAll();
        const edittedItem = getAllResult2.value.find(d => d.name == licenceName)!;
        expect(edittedItem).toBeUndefined();
    });

    test('activate', async () => {
        const getAllResult = await controller.readAll();
        const currentItem = getAllResult.value.find(d => d.name == licenceNewName)!;

        const verifyResult = await controller.activate(getAppGuid(), currentItem.guid);
        licenceHash = verifyResult.value;
        expect(verifyResult.isSuccess).toBeTruthy();
    });

    test('verify', async () => {
        const verifyResult = await controller.verify(getAppGuid(), licenceHash);
        expect(verifyResult.isSuccess).toBeTruthy();
    });

    test('delete', async () => {
        const getAllResult = await controller.readAll();
        const currentItem = getAllResult.value.find(d => d.name == licenceNewName)!;
        const deleteResult = await controller.del(currentItem.guid);
        expect(deleteResult.isSuccess).toBeTruthy();
    });
};