import { endpoints } from "../../../constants/endpoints";
import { TokenExpiryHeaderKey, TokenHeaderKey, UserGuidHeaderKey } from "../../../constants/header-keys";
import { IUserLogin } from "../../../contracts/apiObjects";
import { OAuthUserViewModel } from "../../../contracts/generated/ViewModel/oAuthUserViewModel";
import { Result } from "../../../contracts/result";
import { addSeconds } from "../../../helper/dateHelper";
import { anyObject } from "../../../helper/typescriptHacks";
import { BaseApiService } from "../baseApiService";

export interface IAccountController {
    loginWithGoogleAuth: (userVm: OAuthUserViewModel, userAccFunc: (userAcc: IUserLogin) => void) => Promise<Result>;
    getFakeToken: (userAccFunc: (userAcc: IUserLogin) => void) => Promise<Result>;
}

const authHandler = (
    response: any,
    userVm: OAuthUserViewModel,
    userAccFunc: (userAcc: IUserLogin) => void
) => {
    const token = response.headers.get(TokenHeaderKey);
    const tokenExpiry = response.headers.get(TokenExpiryHeaderKey);
    const userGuid = response.headers.get(UserGuidHeaderKey);

    userAccFunc({
        userGuid: userGuid,
        username: userVm.username,
        profilePic: userVm.profileUrl,
        token: token,
        tokenExpiry: tokenExpiry,
        tokenExpiryDate: addSeconds(new Date(), tokenExpiry),
    });

    return response.status == 200;
}

export const accountController = (service: BaseApiService): IAccountController => ({
    loginWithGoogleAuth: async (userVm: OAuthUserViewModel, userAccFunc: (userAcc: IUserLogin) => void): Promise<Result> => {
        const isSuccess: any = await service.post<any, OAuthUserViewModel>(
            endpoints.authUrl,
            userVm,
            () => anyObject,
            (response: any) => authHandler(response, userVm, userAccFunc),
        );

        return {
            isSuccess,
            errorMessage: '',
        };
    },
    getFakeToken: async (userAccFunc: (userAcc: IUserLogin) => void): Promise<Result> => {
        const fakeUserVm = {
            username: 'fake account',
            profileUrl: 'profile.png',
        } as any;
        const isSuccess: any = await service.post<any, any>(
            endpoints.fakeAuthUrl,
            anyObject,
            () => anyObject,
            (response: any) => authHandler(response, fakeUserVm, userAccFunc),
        );

        return {
            isSuccess,
            errorMessage: '',
        };
    }
});