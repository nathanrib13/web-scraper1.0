const axios = require("axios")
const cheerio = require("cheerio")
const express = require("express")

const app = express()
const PORT = 3000
const url = "https://globo.com/"

app.get("/posts", async (req, res)=>{
    try {
        const posts = await scrapePosts()
        res.status(200).json({posts})
    } catch (error) {
        res.status(500).json({messageL: "Error fetching posts"})
    }
})

async function scrapePosts (){
    const response =  await axios(url)
    const html = response.data
    const $ = cheerio.load(html)
    const posts = []
    $(".post-row.with-6-posts .post").each(function(){
        const url =  $(this).find(".post__link").attr("href")
        const postTitle = $(this).find(".post__title").text()
        posts.push({url, postTitle})
    })
    return posts
}

app.listen(PORT,() =>{console.log(`server is running at port ${PORT}`)})
