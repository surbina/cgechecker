var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_playwright = require("playwright");
var import_isomorphic_unfetch = __toESM(require("isomorphic-unfetch"));
var URL = "https://www.cgeonline.com.ar/informacion/apertura-de-citas.html";
var { BOT_KEY, CHAT_ID, PROXIMA_APERTURA } = process.env;
async function main() {
  var _a;
  console.log("Comenzando chequeo");
  const browser = await import_playwright.chromium.launch();
  const page = await browser.newPage();
  await page.goto(URL);
  const filaNacimientos = page.locator("tbody").locator("tr").nth(19);
  const nombreTramite = await filaNacimientos.locator("td").nth(0).textContent();
  const ultimaApertura = await filaNacimientos.locator("td").nth(1).textContent();
  const proximaApertura = (_a = await filaNacimientos.locator("td").nth(2).textContent()) == null ? void 0 : _a.trim();
  console.log("Tramite: ", nombreTramite);
  console.log("Ultima apertura: ", ultimaApertura);
  console.log("Proxima apertura: ", proximaApertura);
  console.log("CONF PROX AP: ", PROXIMA_APERTURA == null ? void 0 : PROXIMA_APERTURA.trim());
  if (proximaApertura && proximaApertura !== (PROXIMA_APERTURA == null ? void 0 : PROXIMA_APERTURA.trim())) {
    console.log("#################################");
    console.log("## Nuevas fechas se acercan :D ##");
    console.log("#################################");
    const text = encodeURIComponent(`Fecha de proxima apertura de citas actualizada: ${proximaApertura}`);
    await (0, import_isomorphic_unfetch.default)(`https://api.telegram.org/bot${BOT_KEY}/sendMessage?chat_id=${CHAT_ID}&text=${text}`);
  } else {
    console.log("###############################");
    console.log("## No hay nuevas noticias :( ##");
    console.log("###############################");
  }
  console.log("Finalizando chequeo");
  process.exit();
}
main();
