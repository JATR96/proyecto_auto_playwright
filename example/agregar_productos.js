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

    // Agregar productos al carrito

    await page.locator('//*[contains(@href, "products")]/*[contains(@class, "card_travel")]').click();
    await page.locator('//h2[contains(@class, "title")]').waitFor({ state: 'visible' });

    for (let index = 1; index <= 8; index++) {
        await page.locator('//*[@data-product-id = "' + index + '"]/*[contains(@class, "fa-shopping-cart")]').nth(0).click();
    await page.locator('//button[contains(text(), "Continue Shopping")]').waitFor({ state: 'visible' });
    await page.locator('//button[contains(text(), "Continue Shopping")]').click();
    }
    await page.waitForTimeout(1500);

    // Carrito de compras

    //await page.locator('//*[contains(@href, "cart")]/*[contains(text(), "View Cart")]').waitFor({ state: 'visible' });
    //await page.locator('//*[contains(@href, "cart")]/*[contains(text(), "View Cart")]').click();
    await page.locator('//*[contains(@href, "cart")]/*[contains(@class, "shopping")]').click();
    await page.locator('//*[contains(text(), "Proceed To Checkout")]').waitFor({ state: 'visible' });
    await page.locator('//*[contains(text(), "Proceed To Checkout")]').click();

    // Dirección de envío

    await page.locator('//*[contains(text(), "Address Details")]').waitFor({ state: 'visible' });

    // Envío

    await page.locator('//*[contains(text(), "Place Order")]').waitFor({ state: 'visible' });
    await page.locator('//*[contains(text(), "Place Order")]').click();

    // Detalles de pago

    await page.locator('//h2[contains(text(), "Payment")]').waitFor({ state: 'visible' });
    await page.locator('//*[contains(@name, "name_on_card")]').fill('PRUEBA QA');
    await page.locator('//*[contains(@name, "card_number")]').fill('1234 5678 9012 3456');
    await page.locator('//*[contains(@name, "cvc")]').fill('123');
    await page.locator('//*[contains(@name, "expiry_month")]').fill('12');
    await page.locator('//*[contains(@name, "expiry_year")]').fill('2025');
    await page.locator('//*[contains(text(), "Pay and Confirm Order")]').click();

    // Confirmación de pedido

    await page.locator('//*[contains(text(), "Order Placed!")]').waitFor({ state: 'visible' });
    await page.locator('//*[contains(text(), "Congratulations! Your order has been confirmed!")]').waitFor({ state: 'visible' });

    // Volver a home

    await page.locator('//*[contains(@data-qa,"continue-button") and @class="btn btn-primary"]').click();
    await page.locator('//*[@alt = "Website for automation practice"]').waitFor({ state: 'visible' });


    // Cerrar navegador

    await page.waitForTimeout(5000); // Espera 5 segundos para ver el texto escrito
    await browser.close();
    console.log('Navegador cerrado');

})();