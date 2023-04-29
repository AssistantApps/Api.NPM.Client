import { expect, test } from '@jest/globals';
import { DonationType } from '../../../../contracts/generated/Enum/donationType';
import { uuidv4 } from '../../../../helper/guidHelper';
import { BaseApiService } from '../../baseApiService';
import { IDonationController, donationController } from '../donation.controller';

export const donationEndpointTests = (apiService: () => BaseApiService) => () => {
    let controller: IDonationController;
    let newDonationGuid: string = uuidv4();

    beforeAll(async () => {
        controller = donationController(apiService());
    });

    test('get', async () => {
        const getAllResult = await controller.readAll();
        expect(getAllResult.isSuccess).toBeTruthy();
        expect(getAllResult.value.length).toBeGreaterThan(0);
    });

    test('create', async () => {
        const createResult = await controller.create({
            guid: newDonationGuid,
            username: newDonationGuid,
            email: 'jest@jest.jest',
            type: DonationType.buyMeACoffee,
            amount: 2,
            currency: 'USD',
            actualAmount: 2,
            isHidden: false,
            date: new Date(),
        });
        expect(createResult.isSuccess).toBeTruthy();
    });

    test('edit', async () => {
        const getAllResult = await controller.readAllForAdmin();
        const currentItem = getAllResult.value.find(d => d.username == newDonationGuid)!;

        const updateResult = await controller.update({
            ...currentItem,
            actualAmount: 3,
            date: new Date(),
        });
        expect(updateResult.isSuccess).toBeTruthy();

        const getAllResult2 = await controller.readAllForAdmin();
        const editedItem = getAllResult2.value.find(d => d.username == newDonationGuid)!;
        expect(currentItem.actualAmount).toBe(2);
        expect(editedItem.actualAmount).toBe(3);
    });

    test('delete', async () => {
        const getAllResult = await controller.readAllForAdmin();
        const currentItem = getAllResult.value.find(d => d.username == newDonationGuid)!;
        const deleteResult = await controller.del(currentItem.guid);
        expect(deleteResult.isSuccess).toBeTruthy();
    });
};