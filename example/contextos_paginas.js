const {chromium} = require('playwright');

(async () => {
    const browser = await chromium.launch({headless: false});

    // Criando um contexto de navegador - Google
    const googleContext = await browser.newContext();
    const googlePage = await googleContext.newPage();
    await googlePage.goto('https://www.google.com');
    await googlePage.waitForTimeout(5000); // Espera 5 segundos para garantir que a página carregou
    console.log('Google Page Title:', await googlePage.title());

    // Criando um contexto de navegador - Wikipedia
    const wikipediaContext = await browser.newContext();
    const wikipediaPage = await wikipediaContext.newPage();
    await wikipediaPage.goto('https://www.wikipedia.org');
    await wikipediaPage.waitForTimeout(5000); // Espera 5 segundos para garantir que a página carregou
    console.log('Wikipedia Page Title:', await wikipediaPage.title());

    await browser.close();
    console.log('Navegadores cerrados');
})();