const axios = require("axios")
const cheerio = require("cheerio")

const url = "https://globo.com/"

async function main (){
    const response =  await axios(url)
    const html = response.data
    const $ = cheerio.load(html)
    const posts = []
    $(".post-row.with-6-posts .post").each(function(){
        const url =  $(this).find(".post__link").attr("href")
        const postTitle = $(this).find(".post__title").text()
        posts.push({url, postTitle})
    })
    console.log({posts})
}

main()  