const puppeteer = require('puppeteer')

const url = "https://gshow.globo.com/realities/bbb"

async function main(){
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage()
    await page.goto(url)

    await page.evaluate(() =>{
        const posts = Array.from(document.querySelectorAll(".post-item"))

        const data = posts.map((post)=>{
            url: post.querySelector('post-materia-text')?.getAttribute('.href')
            title: post.querySelector('.post-materia-text__title')?.textContent
            description: post.querySelector('.post-materia-text__description')?.textContent
        })

        return data
    })




    await browser.close()
}
main()