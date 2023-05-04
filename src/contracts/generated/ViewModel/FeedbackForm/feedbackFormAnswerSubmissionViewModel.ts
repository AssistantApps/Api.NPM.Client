/* Auto Generated */

import { PlatformType } from "./../../Enum/platformType";
import { FeedbackFormAnswerItemViewModel } from "./feedbackFormAnswerItemViewModel";

export interface FeedbackFormAnswerSubmissionViewModel {
    feedbackFormGuid: string;
    userUniqueIdentifier: string;
    platformType: PlatformType;
    items: FeedbackFormAnswerItemViewModel[];
}
