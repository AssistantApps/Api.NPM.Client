import { endpoints } from "../../../constants/endpoints";
import { FeedbackFormQuestionViewModel } from "../../../contracts/generated/ViewModel/FeedbackForm/feedbackFormQuestionViewModel";
import { Result, ResultWithValue } from "../../../contracts/result";
import { BaseApiService } from "../baseApiService";

export interface IFeedbackFormQuestionController {
    create: (item: FeedbackFormQuestionViewModel) => Promise<Result>;
    readForFeedback: (feedbackGuid: string) => Promise<ResultWithValue<Array<FeedbackFormQuestionViewModel>>>;
    update: (item: FeedbackFormQuestionViewModel) => Promise<Result>;
    del: (guid: string) => Promise<Result>;
}

const apiPath = endpoints.feedbackFormQuestion;

export const feedbackFormQuestionController = (service: BaseApiService): IFeedbackFormQuestionController => ({
    create: (item: FeedbackFormQuestionViewModel): Promise<Result> => {
        return service.post<any, FeedbackFormQuestionViewModel>(
            apiPath,
            item,
            service.addAccessTokenToHeaders,
        );
    },
    readForFeedback: (feedbackGuid: string): Promise<ResultWithValue<Array<FeedbackFormQuestionViewModel>>> => {
        return service.get<Array<FeedbackFormQuestionViewModel>>(
            `${apiPath}/${feedbackGuid}`,
            service.addAccessTokenToHeaders,
        );
    },
    update: (item: FeedbackFormQuestionViewModel): Promise<Result> => {
        return service.put<any, FeedbackFormQuestionViewModel>(
            apiPath,
            item,
            service.addAccessTokenToHeaders,
        );
    },
    del: (guid: string): Promise<Result> => {
        return service.delete(
            `${apiPath}/${guid}`,
            service.addAccessTokenToHeaders,
        );
    }
});