const {chromium} = require('playwright');

(async () => {
    const browser = await chromium.launch({headless: false});

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.google.com');
    await page.waitForTimeout(5000); // Espera 5 segundos para garantir que a página carregou

    // Selecionando el campo de búsqueda y escribiendo una consulta
    await page.fill('#APjFqb', 'Playwright');
    await page.waitForTimeout(2000); // Espera 2 segundos para ver el texto escrito
    await page.press('#APjFqb', 'Enter'); // Presiona Enter para realizar la búsqueda

    await page.waitForSelector('h3'); // Espera a que los resultados de búsqueda se carguen

    await page.click('text=Installation');

    await page.waitForTimeout(5000); // Espera 5 segundos para ver la página de instalación
    await browser.close();
    console.log('Navegador cerrado');
})();