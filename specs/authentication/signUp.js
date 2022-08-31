import { By } from 'selenium-webdriver';
import { expect } from 'chai';

import { baseUrl } from '../../utils/config';
import { buildDriver } from '../../utils/browser';

describe('authentication/signUp', () => {
    let driver;

    before(async () => {
        driver = await buildDriver();
    });

    after(async () => {
        //await driver.quit();
    });

    context('failed', async () => {
        it('empty data and submit Sign Up', async () => {
            await driver.get(`${baseUrl}/#/register`);
            await driver.sleep(1000);
            await driver.findElement(By.css('.btn-primary')).click();
            await driver.sleep(3000);
            const errorMessage = await driver.findElement(By.css('.ng-binding.ng-scope')).getText();
            expect(errorMessage).to.equal("email can't be blank");
        });

        // it('invalid email', async () => {
        //     await await driver.get(`${baseUrl}/#/register`);
        // });
    });

    context('email already been taken', async () => {
        const userName = 'userName Testing';
        const msg = 'email has already been taken';
        it('Show error message', async () => {
            await driver.get(`${baseUrl}/#/register`);
            await driver.sleep(3000);
            await driver.findElement(By.css('fieldset:nth-child(1) input')).sendKeys(userName);
            await driver.findElement(By.css('fieldset:nth-child(2) input')).sendKeys('email_signup@yopmail.com');
            await driver.findElement(By.css('fieldset:nth-child(3) input')).sendKeys('123456');
            await driver.findElement(By.css('.btn-primary')).click();
            await driver.sleep(5000);

            const message = await driver.findElement(By.css('.ng-binding.ng-scope')).getText();
            expect(message).to.contain(msg);
        });
    });

    context('success', async () => {
        const userName = 'userName Testing success +6';
        const email = 'sign+up_email6@yopmail.com'
        it('Sign Up with valid data', async () => {
            await driver.get(`${baseUrl}/#/register`);
            await driver.sleep(3000);
            await driver.findElement(By.css('fieldset:nth-child(1) input')).sendKeys(userName);
            await driver.findElement(By.css('fieldset:nth-child(2) input')).sendKeys(email);
            await driver.findElement(By.css('fieldset:nth-child(3) input')).sendKeys('123456');
            await driver.findElement(By.css('.btn-primary')).click();
            await driver.sleep(5000);

            const account = await driver.findElement(By.css('li:nth-child(4) a')).getText();
            expect(account).to.contain(userName);
        });
    });
});