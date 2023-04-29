import { expect, test } from '@jest/globals';
import { BaseApiService } from '../../baseApiService';
import { ITranslationReportController, translationReportController } from '../translationReport.controller';

export const translationReportEndpointTests = (
    apiService: () => BaseApiService,
    getTransGuid: () => string,
    getTransKeyGuid: () => string,
    getLangGuid: () => string,
) => () => {
    let controller: ITranslationReportController;
    const translationReportName: string = 'jest';
    let translationToResolveAndClose: string;

    beforeAll(async () => {
        controller = translationReportController(apiService());
    });

    test('get', async () => {
        const getAllResult = await controller.readAll();
        expect(getAllResult.isSuccess).toBeTruthy();
        expect(getAllResult.value.length).toBeGreaterThan(0);
    });

    test('create', async () => {
        const createResult = await controller.create({
            translationKey: getTransKeyGuid(),
            translationGuid: getTransGuid(),
            languageGuid: getLangGuid(),
            origText: translationReportName,
            offendingText: translationReportName,
            additionalMessage: translationReportName,
        });
        expect(createResult.isSuccess).toBeTruthy();
    });

    test('get created item', async () => {
        const getAllResult = await controller.readAll();
        const currentItem = getAllResult.value.find(d => d.reason == translationReportName)!;

        translationToResolveAndClose = currentItem.guid;
        expect(currentItem.guid).toBeTruthy();
    });

    test('close', async () => {
        const updateResult = await controller.close(translationToResolveAndClose);
        expect(updateResult.isSuccess).toBeTruthy();
    });
};