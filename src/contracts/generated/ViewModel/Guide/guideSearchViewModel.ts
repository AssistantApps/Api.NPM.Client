/* Auto Generated */

import { SortDirection } from "./../../Enum/sortDirection";
import { AdminApprovalStatus } from "./../../Enum/adminApprovalStatus";

export interface GuideSearchViewModel {
    appGuid: string;
    tag: string;
    name: string;
    orderByName: SortDirection;
    orderByDate: SortDirection;
    orderByViews: SortDirection;
    orderByLikes: SortDirection;
    page: number;
    languageCode: string;
    approvalStatusesToShow: AdminApprovalStatus[];
}
