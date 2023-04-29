import { expect, test } from '@jest/globals';
import { uuidv4 } from '../../../../helper/guidHelper';
import { BaseApiService } from '../../baseApiService';
import { ITeamMemberController, teamMemberController } from '../teamMember.controller';

export const teamMemberEndpointTests = (apiService: () => BaseApiService) => () => {
    let controller: ITeamMemberController;
    const teamMemberName: string = 'jest';
    const teamMemberNewName: string = 'jest-new';

    beforeAll(async () => {
        controller = teamMemberController(apiService());
    });

    test('get', async () => {
        const getAllResult = await controller.readAll();
        expect(getAllResult.isSuccess).toBeTruthy();
        expect(getAllResult.value.length).toBeGreaterThan(0);
    });

    test('create', async () => {
        const createResult = await controller.create({
            guid: uuidv4(),
            name: teamMemberName,
            role: teamMemberName,
            imageUrl: '',
            linkUrl: '',
            linkName: '',
            sortOrder: 0,
        });
        expect(createResult.isSuccess).toBeTruthy();
    });

    test('edit', async () => {
        const getAllResult = await controller.readAll();
        const currentItem = getAllResult.value.find(d => d.name == teamMemberName)!;

        const updateResult = await controller.update({
            ...currentItem,
            name: teamMemberNewName,
        });
        expect(updateResult.isSuccess).toBeTruthy();

        const getAllResult2 = await controller.readAll();
        const edittedItem = getAllResult2.value.find(d => d.name == teamMemberName)!;
        expect(edittedItem).toBeUndefined();
    });

    test('delete', async () => {
        const getAllResult = await controller.readAll();
        const currentItem = getAllResult.value.find(d => d.name == teamMemberNewName)!;
        const deleteResult = await controller.del(currentItem.guid);
        expect(deleteResult.isSuccess).toBeTruthy();
    });
};