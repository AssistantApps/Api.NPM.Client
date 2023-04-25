import { endpoints } from "../../../constants/endpoints";
import { ContactFormViewModel } from "../../../contracts/generated/ViewModel/contactFormViewModel";
import { Result } from "../../../contracts/result";
import { BaseApiService } from "../baseApiService";

export interface IContactController {
    formSubmission: (form: ContactFormViewModel) => Promise<Result>;
}

export const contactController = (service: BaseApiService): IContactController => ({
    formSubmission: (form: ContactFormViewModel): Promise<Result> => {
        return service.post<any, ContactFormViewModel>(
            endpoints.contact,
            form,
            service.addAccessTokenToHeaders,
        );
    },
});