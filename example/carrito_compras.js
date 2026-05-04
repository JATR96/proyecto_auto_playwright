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

    // Iniciar sesión
    
    await page.locator('//*[contains(@action, "login")]/*[contains(@placeholder,"Email")]').fill('prueba_001@mailinator.com');
    await page.locator('//*[contains(@action, "login")]/*[contains(@placeholder,"Password")]').fill('123456');
    await page.locator('//*[contains(@action, "login")]/*[contains(@type,"submit")]').click();

    // Verificar que se ha iniciado sesión
    
    await page.locator('//*[contains(text(),"Logged in as")]').waitFor( {state: 'visible'} );

    // Home

    await page.locator('//*[@alt = "Website for automation practice"]').waitFor({ state: 'visible' });

    // Carrito de compras

    await page.locator('//*[contains(@href, "cart")]/*[contains(@class, "shopping")]').click();

    // Cerrar navegador

    await page.waitForTimeout(5000); // Espera 5 segundos para ver el texto escrito
    await browser.close();
    console.log('Navegador cerrado');

})();