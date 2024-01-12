/* Auto Generated */

import { GuideSectionViewModel } from "./guideSectionViewModel";

export interface AddOrEditGuideViewModel {
    appGuid: string;
    title: string;
    subTitle: string;
    showCreatedByUser: boolean;
    languageCode: string;
    minutes: number;
    tags: string[];
    sections: GuideSectionViewModel[];
    updatedGuideDetails: boolean;
}
