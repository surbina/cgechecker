import { chromium } from 'playwright'
import fetch from 'isomorphic-unfetch'

const URL = 'https://www.cgeonline.com.ar/informacion/apertura-de-citas.html';
const { BOT_KEY, CHAT_ID, PROXIMA_APERTURA } = process.env;

async function main() {
  console.log('Comenzando chequeo');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(URL);

  const filaNacimientos = page.locator('tbody').locator('tr').nth(19);
  const nombreTramite = await filaNacimientos.locator('td').nth(0).textContent();
  const ultimaApertura = await filaNacimientos.locator('td').nth(1).textContent();
  const proximaApertura = await filaNacimientos.locator('td').nth(2).textContent();
  
  console.log('Tramite: ', nombreTramite);
  console.log('Ultima apertura: ', ultimaApertura);
  console.log('Proxima apertura: ', proximaApertura);

  if (proximaApertura && proximaApertura !== PROXIMA_APERTURA) {
    console.log('#################################');
    console.log('## Nuevas fechas se acercan :D ##');
    console.log('#################################');

    const text = encodeURIComponent(`Fecha de proxima apertura de citas actualizada: ${proximaApertura}`);
    await fetch(`https://api.telegram.org/bot${BOT_KEY}/sendMessage?chat_id=${CHAT_ID}&text=${text}`);
  } else {
    console.log('###############################');
    console.log('## No hay nuevas noticias :( ##');
    console.log('###############################');
  }

  console.log('Finalizando chequeo');
  process.exit();
}

main();
