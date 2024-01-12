/* Auto Generated */

import { DonationType } from "./../Enum/donationType";

export interface DonationSearchViewModel {
    page: number;
    types: DonationType[];
    searchText: string;
    startDate?: Date;
    endDate?: Date;
}
