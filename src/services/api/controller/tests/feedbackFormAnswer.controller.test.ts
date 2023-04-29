import { expect, test } from '@jest/globals';
import { PlatformType } from '../../../../contracts/generated/Enum/platformType';
import { BaseApiService } from '../../baseApiService';
import { IFeedbackFormAnswerController, feedbackFormAnswerController } from '../feedbackFormAnswer.controller';

export const feedbackFormAnswerEndpointTests = (
    apiService: () => BaseApiService,
    getFeedbackFormGuid: () => string,
    getFeedbackFormQuestionGuid: () => string,
) => () => {
    let controller: IFeedbackFormAnswerController;
    const feedbackFormName: string = 'jest';

    beforeAll(async () => {
        controller = feedbackFormAnswerController(apiService());
    });

    test('read', async () => {
        const getAllResult = await controller.readForFeedback(getFeedbackFormGuid());
        expect(getAllResult.isSuccess).toBeTruthy();
    });

    test('create', async () => {
        const createResult = await controller.create({
            feedbackFormGuid: getFeedbackFormGuid(),
            userUniqueIdentifier: feedbackFormName,
            platformType: PlatformType.api,
            items: [{
                feedbackFormQuestionGuid: getFeedbackFormQuestionGuid(),
                answer: 'jest-answer',
            }],
        });
        expect(createResult.isSuccess).toBeTruthy();
    });

    test('delete', async () => {
        const getAllResult = await controller.readForFeedback(getFeedbackFormGuid());
        const currentItem = getAllResult.value.find(d => d.anonymousUserGuid == feedbackFormName)!;
        const deleteResult = await controller.del(currentItem.guid);
        expect(deleteResult.isSuccess).toBeTruthy();
    });
};