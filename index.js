const puppeteer = require('puppeteer')

const url = "https://www.mercadolivre.com.br/"
const searchFor = "mackbook"
let linkCounter = 1
let listOfProductsSearched = []

async function main(){
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage()
    console.log("abri navegador")
    await page.goto(url)
    console.log("entrei na url")
    await page.waitForSelector("#cb1-edit")
    
    await page.type("#cb1-edit", searchFor)
    
    await Promise.all([
        page.waitForNavigation(),
        page.click(".nav-search-btn")
    ])
    
    const links = await page.$$eval('.ui-search-item__group > a', el => el.map(link => link.href))
    
    for(const link of links){
        if(linkCounter === 20) continue
        const produtcsResults = {}
        console.log('pagina', linkCounter)
        await page.goto(link)
        await page.waitForSelector('.ui-pdp-title')

        const title = await page.$eval('.ui-pdp-title', element => element.innerText )
        const price = await page.$eval('.andes-money-amount__fraction', element => element.innerText )

        const seller = await page.evaluate(()=>{
            const element = document.querySelector('.ui-pdp-seller__link-trigger')
            if(!element) return null
            return element.innerText
        })   

        produtcsResults.title = title;
        produtcsResults.price = price;
        (seller ? produtcsResults.seller = seller : 'Vendedor não informado');
        produtcsResults.link = link;

        listOfProductsSearched.push(produtcsResults);

        linkCounter ++
    }

    console.log(listOfProductsSearched)

    await page.waitForTimeout(3000)
    await browser.close()
}
main()