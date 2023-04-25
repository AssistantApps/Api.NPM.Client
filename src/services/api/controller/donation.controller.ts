import { endpoints } from "../../../constants/endpoints";
import { IApiSearch } from "../../../contracts/apiObjects";
import { DonationViewModel } from "../../../contracts/generated/ViewModel/donationViewModel";
import { Result, ResultWithValueAndPagination } from "../../../contracts/result";
import { BaseApiService } from "../baseApiService";

export interface IDonationController {
    create: (item: DonationViewModel) => Promise<Result>;
    readAll: (page?: number) => Promise<ResultWithValueAndPagination<Array<DonationViewModel>>>;
    readAllForAdmin: (search?: IApiSearch) => Promise<ResultWithValueAndPagination<Array<DonationViewModel>>>;
    update: (item: DonationViewModel) => Promise<Result>;
    del: (guid: string) => Promise<Result>;
}

const apiPath = endpoints.donation;

export const donationController = (service: BaseApiService): IDonationController => ({
    create: (item: DonationViewModel): Promise<Result> => {
        return service.post<any, DonationViewModel>(
            apiPath, item,
            service.addAccessTokenToHeaders,
        );
    },
    readAll: async (page?: number): Promise<ResultWithValueAndPagination<Array<DonationViewModel>>> => {
        let url = apiPath;
        if (page != null) {
            url += `?page=${apiPath}`;
        }
        const apiResult = await service.get<ResultWithValueAndPagination<Array<DonationViewModel>>>(url);
        return apiResult.value;
    },
    readAllForAdmin: async (search?: IApiSearch): Promise<ResultWithValueAndPagination<Array<DonationViewModel>>> => {
        const apiResult = await service.post<ResultWithValueAndPagination<Array<DonationViewModel>>, any>(
            `${apiPath}/Search`,
            {
                page: search?.page ?? 1,
                searchText: search?.searchText ?? '',
            },
            service.addAccessTokenToHeaders,
        );
        return apiResult.value;
    },
    update: (item: DonationViewModel): Promise<Result> => {
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