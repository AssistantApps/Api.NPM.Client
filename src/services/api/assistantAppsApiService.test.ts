import { describe } from '@jest/globals';
import { IUserLogin } from '../../contracts/apiObjects';
import { BaseApiService } from './baseApiService';
import { accountController } from './controller/account.controller';
import { appController } from './controller/app.controller';
import { appEndpointTests } from './controller/tests/app.controller.test';
import { appNoticeEndpointTests } from './controller/tests/appNotice.controller.test';
import { badgeEndpointTests } from './controller/tests/badge.controller.test';
import { cacheEndpointTests } from './controller/tests/cache.controller.test';
import { dashboardEndpointTests } from './controller/tests/dashboard.controller.test';
import { donationEndpointTests } from './controller/tests/donation.controller.test';
import { languageEndpointTests } from './controller/tests/language.controller.test';
import { translationKeyController } from './controller/translationKey.controller';
import { licenceEndpointTests } from './controller/tests/licence.controller.test';
import { patreonEndpointTests } from './controller/tests/patreon.controller.test';
import { permissionEndpointTests } from './controller/tests/permission.controller.test';
import { steamEndpointTests } from './controller/tests/steam.controller.test';
import { teamMemberEndpointTests } from './controller/tests/teamMember.controller.test';
import { translationKeyEndpointTests } from './controller/tests/translationKey.controller.test';
import { feedbackFormEndpointTests } from './controller/tests/feedbackForm.controller.test';
import { quickActionEndpointTests } from './controller/tests/quickAction.controller.test';
import { translationImageEndpointTests } from './controller/tests/translationImage.controller.test';
import { translationReportEndpointTests } from './controller/tests/translationReport.controller.test';
import { translationController } from './controller/translation.controller';
import { translationEndpointTests } from './controller/tests/translation.controller.test';
import { languageController } from './controller/language.controller';
import { translationStatEndpointTests } from './controller/tests/translationStat.controller.test';
import { userEndpointTests } from './controller/tests/user.controller.test';
import { userActivityEndpointTests } from './controller/tests/userActivity.controller.test';
import { versionEndpointTests } from './controller/tests/version.controller.test';
import { AssistantAppsApiService } from './assistantAppsApiService';

const localApi = 'http://localhost:55555';
let apiService = new BaseApiService(localApi);

describe('Api service', () => {
    let appGuid: string;
    let userGuid: string;
    let langGuid: string;
    let transGuid: string;
    let transKeyGuid: string;

    beforeAll(async () => {
        const auth = accountController(apiService);
        await auth.getFakeToken((userAcc: IUserLogin) => {
            console.log('token:', userAcc.token);
            userGuid = userAcc.userGuid;
            apiService = new AssistantAppsApiService({
                url: localApi,
                authToken: userAcc.token,
            })
        });

        const initAppController = appController(apiService);
        const appsResult = await initAppController.readAll();
        appGuid = appsResult.value.filter(a => a.gameName == 'Dinkum')[0].guid;

        const iniLangController = languageController(apiService);
        const langsResult = await iniLangController.readAll();
        langGuid = langsResult.value.filter(l => l.languageCode == 'de')[0].guid;

        const initTransKeyController = translationKeyController(apiService);
        const transKeyResult = await initTransKeyController.readAll();
        transKeyGuid = transKeyResult.value.filter(t => t.key == 'loading')[0].guid;

        const initTransController = translationController(apiService);
        const transResult = await initTransController.readForLang(transKeyGuid, langGuid);
        transGuid = transResult.value[0].guid;
    }, 20000);

    const getApi = () => apiService;
    const getAppGuid = () => appGuid;
    const getUserGuid = () => userGuid;
    const getLangGuid = () => langGuid;
    const getTransGuid = () => transGuid;
    const getTransKeyGuid = () => transKeyGuid;

    describe('App', appEndpointTests(getApi));
    describe('AppNotice', appNoticeEndpointTests(getApi, getAppGuid));
    // describe('AppReview', appReviewEndpointTests(getApi));
    describe('Badge', badgeEndpointTests(getApi, getAppGuid));
    describe('Cache', cacheEndpointTests(getApi));
    describe('Dashboard', dashboardEndpointTests(getApi));
    describe('Donation', donationEndpointTests(getApi));
    describe('Feedback', feedbackFormEndpointTests(getApi, getAppGuid));
    describe('Language', languageEndpointTests(getApi, getTransKeyGuid));
    describe('Licence', licenceEndpointTests(getApi, getAppGuid));
    describe('Patreon', patreonEndpointTests(getApi));
    describe('Permission', permissionEndpointTests(getApi, getUserGuid));
    describe('Permission', permissionEndpointTests(getApi, getUserGuid));
    describe('QuickAction', quickActionEndpointTests(getApi));
    // describe('Steam', steamEndpointTests(getApi));
    describe('TeamMember', teamMemberEndpointTests(getApi));
    describe('Translation', translationEndpointTests(getApi, getTransGuid, getTransKeyGuid, getAppGuid, getLangGuid));
    describe('TranslationImage', translationImageEndpointTests(getApi, getTransKeyGuid));
    describe('TranslationKey', translationKeyEndpointTests(getApi, getAppGuid));
    describe('TranslationReport', translationReportEndpointTests(getApi, getTransGuid, getTransKeyGuid, getLangGuid));
    describe('TranslationStat', translationStatEndpointTests(getApi));
    describe('User', userEndpointTests(getApi));
    describe('UserActivity', userActivityEndpointTests(getApi));
    describe('Version', versionEndpointTests(getApi, getAppGuid));
});