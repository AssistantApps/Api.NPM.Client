import { IAssistantAppsApiState } from '../../contracts/state';
import { BaseApiService } from './baseApiService';
import { accountController } from './controller/account.controller';
import { appController } from './controller/app.controller';
import { appNoticeController } from './controller/appNotice.controller';
import { appReviewController } from './controller/appReview.controller';
import { badgeController } from './controller/badge.controller';
import { cacheController } from './controller/cache.controller';
import { contactController } from './controller/contact.controller';
import { dashboardController } from './controller/dashboard.controller';
import { donationController } from './controller/donation.controller';
import { feedbackFormController } from './controller/feedbackForm.controller';
import { feedbackFormAnswerController } from './controller/feedbackFormAnswer.controller';
import { feedbackFormQuestionController } from './controller/feedbackFormQuestion.controller';
import { languageController } from './controller/language.controller';
import { licenceController } from './controller/licence.controller';
import { oAuthController } from './controller/oauth.controller';
import { patreonController } from './controller/patreon.controller';
import { permissionController } from './controller/permission.controller';
import { quickActionController } from './controller/quickAction.controller';
import { steamController } from './controller/steam.controller';
import { teamMemberController } from './controller/teamMember.controller';
import { translationImageController } from './controller/translationImage.controller';
import { translationKeyController } from './controller/translationKey.controller';
import { translationReportController } from './controller/translationReport.controller';
import { translationStatController } from './controller/translationStat.controller';
import { userController } from './controller/user.controller';
import { userActivityController } from './controller/userActivity.controller';
import { versionController } from './controller/version.controller';
import { addAccessTokenToHeaders, formDataWithAccessTokenHeaders } from "../../helper/headerHelper";
import { translationController } from './controller/translation.controller';


export class AssistantAppsApiService extends BaseApiService {
    private _state: IAssistantAppsApiState = {
        url: '',
        authToken: '',
    };

    constructor(state?: IAssistantAppsApiState) {
        const apiUrl: string = state?.url ?? 'https://api.assistantapps.com';
        super(apiUrl);

        this._state.url = apiUrl;
        this._state.authToken = state?.authToken ?? '';
    }

    addAccessTokenToHeaders = () => addAccessTokenToHeaders({ authToken: this._state.authToken })
    formDataWithAccessTokenHeaders = () => formDataWithAccessTokenHeaders({ authToken: this._state.authToken })

    account = accountController(this);
    app = appController(this);
    appNotice = appNoticeController(this);
    appReview = appReviewController(this);
    badge = badgeController(this);
    cache = cacheController(this);
    contact = contactController(this);
    dashboard = dashboardController(this);
    donation = donationController(this);
    language = languageController(this);
    licence = licenceController(this);
    feedbackForm = feedbackFormController(this);
    feedbackFormAnswer = feedbackFormAnswerController(this);
    feedbackFormQuestion = feedbackFormQuestionController(this);
    oAuth = oAuthController(this);
    patreon = patreonController(this);
    permission = permissionController(this);
    quickAction = quickActionController(this);
    steam = steamController(this);
    teamMember = teamMemberController(this);
    translation = translationController(this);
    translationImage = translationImageController(this);
    translationKey = translationKeyController(this);
    translationReport = translationReportController(this);
    translationStat = translationStatController(this);
    user = userController(this);
    userActivity = userActivityController(this);
    version = versionController(this);
}
