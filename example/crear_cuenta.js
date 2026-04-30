const {chromium} = require('playwright');

(async () => {
    const browser = await chromium.launch({
        headless: false, 
        args: ['--start-maximized']
    });
    const context = await browser.newContext({
        viewport: null
    });
    const page = await context.newPage();
    await page.goto('https://www.automationexercise.com');
    await page.waitForSelector('xpath=//*[@alt = "Website for automation practice"]');

    await page.locator('//*[contains(text(),"Login")]').click();
    await page.locator('//*[@type="submit" and @data-qa="login-button"]').waitFor();

    // Crear una cuenta
    await page.locator('//*[contains(@action, "signup")]/*[contains(@placeholder,"Name")]').fill('prueba');
    await page.locator('//*[contains(@action, "signup")]/*[contains(@placeholder,"Email")]').fill('prueba_004@mailinator.com');
    await page.locator('//*[contains(@action, "signup")]/*[contains(@type,"submit")]').click();

    await page.locator('//*[contains(text(),"Enter Account Information")]').waitFor();

    await page.locator('//*[@value="Mr"]').click();
    await page.locator('//*[contains(@type,"password") and contains(@name,"password")]').fill('123456');

    // Selects

    const daySelect = page.locator('//*[contains(@id,"day") and contains(@class,"form-control")]');
    await daySelect.waitFor({ state: 'visible' });
    await daySelect.selectOption('10');

    const daysSelect = page.locator('//*[contains(@id,"days") and contains(@class,"form-control")]');
    await daysSelect.waitFor({ state: 'visible' });
    await daysSelect.selectOption('5');

    const monthSelect = page.locator('//*[contains(@id,"month") and contains(@class,"form-control")]');
    await monthSelect.waitFor({ state: 'visible' });
    await monthSelect.selectOption('10');

    const yearSelect = page.locator('//*[contains(@id,"year") and contains(@class,"form-control")]');
    await yearSelect.waitFor({ state: 'visible' });
    await yearSelect.selectOption('1996');

    // Checkboxes

    const newsletterCheckbox = page.locator('//*[contains(text(),"Sign up for our newsletter!")]');
    await newsletterCheckbox.waitFor({ state: 'visible' });
    await newsletterCheckbox.check();

    const offersCheckbox = page.locator('//*[contains(text(),"Receive special offers from our partners!")]');
    await offersCheckbox.waitFor({ state: 'visible' });
    await offersCheckbox.check();

    // Datos personales

    await page.locator('//*[@id="first_name" and @type="text"]').fill('prueba');
    await page.locator('//*[@id="last_name" and @type="text"]').fill('rojo');
    await page.locator('//*[@id="company" and @type="text"]').fill('Los Rojas');

    // Direccion

    await page.locator('//*[@id="address1" and @type="text"]').fill('Calle falsa 123');
    await page.locator('//*[@id="address2" and @type="text"]').fill('Calle falsa 456');
    await page.locator('//*[@id="country" and contains(@class,"form-control")]').selectOption('United States');
    await page.locator('//*[@id="state" and @type="text"]').fill('Florida');
    await page.locator('//*[@id="city" and @type="text"]').fill('Miami');
    await page.locator('//*[@id="zipcode" and @type="text"]').fill('33101');
    await page.locator('//*[@id="mobile_number" and @type="text"]').fill('+1234567890');

    // Enviar el formulario
    await page.locator('//*[contains(@data-qa,"create-account") and @type="submit"]').click();

    // Verificar que la cuenta se ha creado
    await page.locator('//*[contains(text(),"Account Created!")]').waitFor({ state: 'visible' });

    await page.waitForTimeout(5000); // Espera 5 segundos para ver el texto escrito
    await browser.close();
    console.log('Navegador cerrado');
})();