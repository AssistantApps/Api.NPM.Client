import { endpoints } from "../../../constants/endpoints";
import { ISteamBranchRow } from "../../../contracts/apiObjects";
import { AppType } from "../../../contracts/generated/Enum/appType";
import { SteamBranchItemViewModel } from "../../../contracts/generated/ViewModel/Steam/steamBranchItemViewModel";
import { SteamNewsItemViewModel } from "../../../contracts/generated/ViewModel/Steam/steamNewsItemViewModel";
import { Result, ResultWithValue } from "../../../contracts/result";
import { BaseApiService } from "../baseApiService";

export interface ISteamController {
    readNews: (appType: string) => Promise<ResultWithValue<Array<SteamNewsItemViewModel>>>;
    readBranch: (appType: string) => Promise<ResultWithValue<ISteamBranchRow>>;
    readAllBranches: () => Promise<ResultWithValue<Array<ISteamBranchRow>>>;
    updateBranch: (appType: string, item: ISteamBranchRow) => Promise<Result>;
}

export const steamController = (service: BaseApiService): ISteamController => {

    const _appTypes = [AppType.nms, AppType.sms];

    const readBranch = async (appType: string): Promise<ResultWithValue<ISteamBranchRow>> => {
        const branchesResult = await service.get<Array<SteamBranchItemViewModel>>(
            `${endpoints.steamBranches}/${appType}`
        );
        return {
            ...branchesResult,
            value: {
                appType: AppType[appType as any] as any,
                branches: branchesResult.value,
            }
        }
    };

    return ({
        readNews: (appType: string): Promise<ResultWithValue<Array<SteamNewsItemViewModel>>> => {
            return service.get<Array<SteamNewsItemViewModel>>(`${endpoints.steamNews}/${appType}`);
        },
        readBranch,
        readAllBranches: async (): Promise<ResultWithValue<Array<ISteamBranchRow>>> => {
            const result: Array<ISteamBranchRow> = [];

            for (const appType of _appTypes) {
                const localBranch = await readBranch(appType.toString());
                if (localBranch.isSuccess) {
                    result.push(localBranch.value);
                }
            }

            return {
                isSuccess: true,
                value: result,
                errorMessage: '',
            };
        },
        updateBranch: (appType: string, item: ISteamBranchRow): Promise<Result> => {
            return service.put(
                `${endpoints.steamBranches}/${appType}`,
                {
                    newData: item.branches
                },
                service.addAccessTokenToHeaders,
            );
        },
    });
};
