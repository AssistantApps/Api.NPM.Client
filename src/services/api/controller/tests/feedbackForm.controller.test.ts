import { expect, test } from '@jest/globals';
import { uuidv4 } from '../../../../helper/guidHelper';
import { BaseApiService } from '../../baseApiService';
import { IFeedbackFormController, feedbackFormController } from '../feedbackForm.controller';
import { feedbackFormAnswerEndpointTests } from './feedbackFormAnswer.controller.test';
import { feedbackFormQuestionDownEndpointTests, feedbackFormQuestionUpEndpointTests } from './feedbackFormQuestion.controller.test';

export const feedbackFormEndpointTests = (
    apiService: () => BaseApiService,
    getAppGuid: () => string,
) => () => {
    let controller: IFeedbackFormController;
    const feedbackFormName: string = 'jest';
    const feedbackFormNewName: string = 'jest-new';
    let feedbackFormGuid: string;
    let feedbackFormQuestionGuid: string;

    beforeAll(async () => {
        controller = feedbackFormController(apiService());
    });

    test('create', async () => {
        const createResult = await controller.create({
            guid: uuidv4(),
            appGuid: getAppGuid(),
            title: feedbackFormName,
            text: 'jest text',
            dateCreated: new Date(),
        });
        expect(createResult.isSuccess).toBeTruthy();
    });

    test('read', async () => {
        const getAllResult = await controller.readAllForAdmin();
        expect(getAllResult.isSuccess).toBeTruthy();
        expect(getAllResult.value.length).toBeGreaterThan(0);
    });

    test('edit', async () => {
        const getAllResult = await controller.readAllForAdmin();
        const currentItem = getAllResult.value.find(d => d.title == feedbackFormName)!;
        feedbackFormGuid = currentItem.guid;

        const updateResult = await controller.update({
            ...currentItem,
            title: feedbackFormNewName,
        });
        expect(updateResult.isSuccess).toBeTruthy();

        const getAllResult2 = await controller.readAllForAdmin();
        const edittedItem = getAllResult2.value.find(d => d.title == feedbackFormName)!;
        expect(edittedItem).toBeUndefined();
    });

    describe('Question - up', feedbackFormQuestionUpEndpointTests(
        apiService,
        () => feedbackFormGuid,
        (qGuid: string) => { feedbackFormQuestionGuid = qGuid; }
    ));

    describe('Answer', feedbackFormAnswerEndpointTests(
        apiService,
        () => feedbackFormGuid,
        () => feedbackFormQuestionGuid,
    ));

    describe('Question - down', feedbackFormQuestionDownEndpointTests(
        apiService, () =>
        feedbackFormGuid
    ));

    test('delete', async () => {
        const getAllResult = await controller.readAllForAdmin();
        const currentItem = getAllResult.value.find(d => d.title == feedbackFormNewName)!;
        const deleteResult = await controller.del(currentItem.guid);
        expect(deleteResult.isSuccess).toBeTruthy();
    });
};