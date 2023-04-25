import { endpoints } from "../../../constants/endpoints";
import { FeedbackFormAdminAnswerViewModel } from "../../../contracts/generated/ViewModel/FeedbackForm/feedbackFormAdminAnswerViewModel";
import { FeedbackFormAnswerSubmissionViewModel } from "../../../contracts/generated/ViewModel/FeedbackForm/feedbackFormAnswerSubmissionViewModel";
import { Result, ResultWithValue } from "../../../contracts/result";
import { BaseApiService } from "../baseApiService";

export interface IFeedbackFormAnswerController {
    create: (item: FeedbackFormAnswerSubmissionViewModel) => Promise<Result>;
    readForFeedback: (appGuid: string) => Promise<ResultWithValue<Array<FeedbackFormAdminAnswerViewModel>>>;
    del: (guid: string) => Promise<Result>;
}

const apiPath = endpoints.feedbackFormAnswer;

export const feedbackFormAnswerController = (service: BaseApiService): IFeedbackFormAnswerController => ({
    create: (item: FeedbackFormAnswerSubmissionViewModel): Promise<Result> => {
        return service.post<any, FeedbackFormAnswerSubmissionViewModel>(
            apiPath,
            item,
            service.addAccessTokenToHeaders,
        );
    },
    readForFeedback: (guid: string): Promise<ResultWithValue<Array<FeedbackFormAdminAnswerViewModel>>> => {
        return service.get<Array<FeedbackFormAdminAnswerViewModel>>(
            `${apiPath}/${guid}`,
            service.addAccessTokenToHeaders,
        );
    },
    del: (guid: string): Promise<Result> => {
        return service.delete(
            `${apiPath}/${guid}`,
            service.addAccessTokenToHeaders,
        );
    },
});