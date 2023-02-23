import { chromium } from 'playwright'

const URL = 'https://www.cgeonline.com.ar/informacion/apertura-de-citas.html';

async function main() {
  console.log('Comenzando chequeo');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(URL);

  const filaNacimientos = page.locator('tbody').locator('tr').nth(19);
  const nombreTramite = filaNacimientos.locator('td').nth(0);
  const ultimaApertura = filaNacimientos.locator('td').nth(1);
  const proximaApertura = filaNacimientos.locator('td').nth(2);
  
  console.log('Tramite: ', await nombreTramite.textContent());
  console.log('Ultima apertura: ', await ultimaApertura.textContent());
  console.log('Proxima apertura: ', await proximaApertura.textContent());

  console.log('Finalizando chequeo');
  process.exit();
}

main();
