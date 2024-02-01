const puppeteer = require('puppeteer')

const url = "https://www.mercadolivre.com.br/"
const searchFor = "mackbook"

async function main(){
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage()
    
    await page.goto(url)
    await page.waitForSelector("#cb1-edit")
    
    await page.type("#cb1-edit", searchFor)
    
    await Promise.all([
        page.waitForNavigation(),
        page.click(".nav-search-btn")
    ])
    
    const links = await page.$$eval('.ui-search-item__group > a', el => el.map(link => link.href))
    console.log(links)
    await page.waitForTimeout(3000)
    await browser.close()
}
main()