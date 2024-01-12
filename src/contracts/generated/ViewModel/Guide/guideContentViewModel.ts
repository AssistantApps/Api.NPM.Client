/* Auto Generated */

import { AdminApprovalStatus } from "./../../Enum/adminApprovalStatus";
import { GuideSectionViewModel } from "./guideSectionViewModel";

export interface GuideContentViewModel {
    guid: string;
    title: string;
    subTitle: string;
    likes: number;
    views: number;
    showCreatedByUser: boolean;
    userGuid: string;
    userName: string;
    appGuid: string;
    languageCode: string;
    minutes: number;
    tags: string[];
    originalGuideGuid: string;
    translatorGuid?: string;
    status: AdminApprovalStatus;
    dateCreated: Date;
    sections: GuideSectionViewModel[];
}
