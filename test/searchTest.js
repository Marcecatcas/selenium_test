import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';

describe('Prueba de búsqueda en Google', function () {
    this.timeout(10000);
    let driver;

    // Configuración inicial: se ejecuta antes de las pruebas
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
      });
    
      it('Debería buscar "Selenium" y verificar resultados', async function() {
        await driver.get('https://www.google.com');
        await driver.findElement(By.name('q')).sendKeys('Selenium', Key.RETURN);
        await driver.wait(until.elementLocated(By.css('h3')), 10000); // Espera hasta que aparezca el primer resultado
        let title = await driver.getTitle();
        expect(title).to.include('Selenium');
      });
    
      after(async function() {
        if (driver) {
          await driver.quit(); // Cierra el navegador después de la prueba
        }
    })
});
