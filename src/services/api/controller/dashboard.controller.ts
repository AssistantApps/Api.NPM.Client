import { endpoints } from "../../../constants/endpoints";
import { DashboardItemViewModel } from "../../../contracts/generated/ViewModel/dashboardItemViewModel";
import { ResultWithValue } from "../../../contracts/result";
import { BaseApiService } from "../baseApiService";

export interface IDashboardController {
    dashboard: () => Promise<ResultWithValue<Array<DashboardItemViewModel>>>;
    adminDashboard: () => Promise<ResultWithValue<Array<DashboardItemViewModel>>>;
}

export const dashboardController = (service: BaseApiService): IDashboardController => ({
    dashboard: (): Promise<ResultWithValue<Array<DashboardItemViewModel>>> => {
        return service.get<Array<DashboardItemViewModel>>(
            endpoints.dashboard
        );
    },
    adminDashboard: (): Promise<ResultWithValue<Array<DashboardItemViewModel>>> => {
        return service.get<Array<DashboardItemViewModel>>(
            endpoints.dashboard,
            service.addAccessTokenToHeaders,
        );
    },
});