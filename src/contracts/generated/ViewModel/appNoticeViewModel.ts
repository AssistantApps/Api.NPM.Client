﻿/* Auto Generated */

import { PlatformType } from "./../Enum/platformType";

export interface AppNoticeViewModel {
    guid: string;
    appGuid: string;
    name: string;
    subtitle: string;
    iconUrl: string;
    externalUrl: string;
    languageCode: string;
    platforms: PlatformType[];
    isVisible: boolean;
    endDate: Date;
    sortOrder: number;
}
