import { expect, test } from '@jest/globals';
import { FeedbackQuestionType } from '../../../../contracts/generated/Enum/feedbackQuestionType';
import { uuidv4 } from '../../../../helper/guidHelper';
import { BaseApiService } from '../../baseApiService';
import { IFeedbackFormQuestionController, feedbackFormQuestionController } from '../feedbackFormQuestion.controller';

const feedbackFormNewName: string = 'jest-new';

export const feedbackFormQuestionUpEndpointTests = (
    apiService: () => BaseApiService,
    getFeedbackFormGuid: () => string,
    setFeedbackFormQuestionGuid: (qGuid: string) => void,
) => () => {
    let controller: IFeedbackFormQuestionController;
    const feedbackFormName: string = 'jest';

    beforeAll(async () => {
        controller = feedbackFormQuestionController(apiService());
    });

    test('get', async () => {
        const getAllResult = await controller.readForFeedback(getFeedbackFormGuid());
        expect(getAllResult.isSuccess).toBeTruthy();
    });

    test('create', async () => {
        const createResult = await controller.create({
            guid: uuidv4(),
            feedbackFormGuid: getFeedbackFormGuid(),
            questionText: feedbackFormName,
            questionType: FeedbackQuestionType.yesNo,
            answerCanContainSensitiveInfo: false,
            sortOrder: 0,
        });
        expect(createResult.isSuccess).toBeTruthy();
    });

    test('edit', async () => {
        const getAllResult = await controller.readForFeedback(getFeedbackFormGuid());
        const currentItem = getAllResult.value.find(d => d.questionText == feedbackFormName)!;
        setFeedbackFormQuestionGuid(currentItem.guid);

        const updateResult = await controller.update({
            ...currentItem,
            questionText: feedbackFormNewName,
        });
        expect(updateResult.isSuccess).toBeTruthy();

        const getAllResult2 = await controller.readForFeedback(getFeedbackFormGuid());
        const edittedItem = getAllResult2.value.find(d => d.questionText == feedbackFormName)!;
        expect(edittedItem).toBeUndefined();
    });
};

export const feedbackFormQuestionDownEndpointTests = (
    apiService: () => BaseApiService,
    getFeedbackFormGuid: () => string,
) => () => {
    let controller: IFeedbackFormQuestionController;

    beforeAll(async () => {
        controller = feedbackFormQuestionController(apiService());
    });

    test('delete', async () => {
        const getAllResult = await controller.readForFeedback(getFeedbackFormGuid());
        const currentItem = getAllResult.value.find(d => d.questionText == feedbackFormNewName)!;
        const deleteResult = await controller.del(currentItem.guid);
        expect(deleteResult.isSuccess).toBeTruthy();
    });
};