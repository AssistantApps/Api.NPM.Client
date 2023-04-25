import { endpoints } from "../../../constants/endpoints";
import { TeamMemberViewModel } from "../../../contracts/generated/ViewModel/teamMemberViewModel";
import { Result, ResultWithValue } from "../../../contracts/result";
import { BaseApiService } from "../baseApiService";

export interface ITeamMemberController {
    create: (item: TeamMemberViewModel) => Promise<Result>;
    readAll: () => Promise<ResultWithValue<Array<TeamMemberViewModel>>>;
    update: (item: TeamMemberViewModel) => Promise<Result>;
    del: (guid: string) => Promise<Result>;
}

const apiPath = endpoints.teamMember;

export const teamMemberController = (service: BaseApiService): ITeamMemberController => ({
    create: (item: TeamMemberViewModel): Promise<Result> => {
        return service.post<any, TeamMemberViewModel>(
            apiPath, item,
            service.addAccessTokenToHeaders,
        );
    },
    readAll: (): Promise<ResultWithValue<Array<TeamMemberViewModel>>> => {
        return service.get<Array<TeamMemberViewModel>>(apiPath);
    },
    update: (item: TeamMemberViewModel): Promise<Result> => {
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
