import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';

describe('Prueba de búsqueda en Google', function () {
    let driver;

    // Configuración inicial: se ejecuta antes de las pruebas
    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    // Limpieza: se ejecuta después de las pruebas
    after(async function () {
        await driver.quit();
    });

    // Prueba de búsqueda en Google
    it('Debería buscar "Selenium" y verificar resultados', async function () {
        // Navegar a Google
        await driver.get('https://www.google.com');

        // Encontrar el campo de búsqueda, ingresar "Selenium" y presionar Enter
        let searchBox = await driver.findElement(By.name('q'));
        await searchBox.sendKeys('Selenium', Key.RETURN);

        // Esperar a que se carguen los resultados
        await driver.wait(until.elementLocated(By.id('search')), 10000);

        // Verificar que los resultados contienen la palabra "Selenium"
        let results = await driver.findElements(By.css('h3'));
        let resultsText = await Promise.all(results.map(result => result.getText()));
        let containsSelenium = resultsText.some(text => text.toLowerCase().includes('selenium'));

        expect(containsSelenium).to.be.true;
    });
});
