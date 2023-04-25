import { endpoints } from "../../../constants/endpoints";
import { FeedbackFormViewModel } from "../../../contracts/generated/ViewModel/FeedbackForm/feedbackFormViewModel";
import { FeedbackFormWithQuestionsViewModel } from "../../../contracts/generated/ViewModel/FeedbackForm/feedbackFormWithQuestionsViewModel";
import { Result, ResultWithValue } from "../../../contracts/result";
import { BaseApiService } from "../baseApiService";

export interface IFeedbackFormController {
    create: (item: FeedbackFormViewModel) => Promise<Result>;
    readLatest: (appGuid: string) => Promise<ResultWithValue<FeedbackFormWithQuestionsViewModel>>;
    readAllForAdmin: () => Promise<ResultWithValue<Array<FeedbackFormViewModel>>>;
    update: (item: FeedbackFormViewModel) => Promise<Result>;
    del: (guid: string) => Promise<Result>;
}

const apiPath = endpoints.feedbackForm;

export const feedbackFormController = (service: BaseApiService): IFeedbackFormController => ({
    create: (item: FeedbackFormViewModel): Promise<Result> => {
        return service.post<any, FeedbackFormViewModel>(
            apiPath, item,
            service.addAccessTokenToHeaders,
        );
    },
    readLatest: (appGuid: string): Promise<ResultWithValue<FeedbackFormWithQuestionsViewModel>> => {
        return service.get<FeedbackFormWithQuestionsViewModel>(`${apiPath}/${appGuid}`);
    },
    readAllForAdmin: (): Promise<ResultWithValue<Array<FeedbackFormViewModel>>> => {
        return service.get<Array<FeedbackFormViewModel>>(
            `${apiPath}/Admin`,
            service.addAccessTokenToHeaders,
        );
    },
    update: (item: FeedbackFormViewModel): Promise<Result> => {
        return service.put(
            apiPath, item,
            service.addAccessTokenToHeaders,
        );
    },
    del: (guid: string): Promise<Result> => {
        const url = `${apiPath}/${guid}`;
        return service.delete(
            url,
            service.addAccessTokenToHeaders,
        );
    }
});