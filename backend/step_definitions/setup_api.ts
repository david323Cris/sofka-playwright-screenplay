import { BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { request, APIRequestContext } from '@playwright/test';

setDefaultTimeout(30 * 1000);

let apiContext: APIRequestContext;

BeforeAll(async () => {
    apiContext = await request.newContext({
        baseURL: 'https://api.demoblaze.com',
        extraHTTPHeaders: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    });
});

AfterAll(async () => {
    await apiContext.dispose();
});

export { apiContext };