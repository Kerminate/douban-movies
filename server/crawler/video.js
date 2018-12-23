const puppeteer = require('puppeteer')

const base = `https://movie.douban.com/subject/`

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

process.on('message', async (movies) => {
  console.log('Start visit the target page')

  const browser = await puppeteer.launch({
    args: ['--no-sandbox'], // 去沙箱模式
    dumpio: false
  })

  const page = await browser.newPage()

  for (let i = 0; i < movies.length; i++) {
    const doubanId = movies[i].doubanId
    
    await page.goto(base + doubanId, {
      waitUntil: 'networkidle2' // 等到空闲
    })
    
    await sleep(1000)
    
    const result = await page.evaluate(() => {
      const $ = window.$
      const it = $('.related-pic-video')
      if (it && it.length > 0) {
        const link = it.attr('href')
        const str = it.css('background-image')
        const cover = str.match(/url\("(\S*)"\)/)[1]
        
        return {
          link,
          cover
        }
      }
      
      return {}
    })
    
    let video
    if (result.link) {
      await page.goto(result.link, {
        waitUntil: 'networkidle2'
      })
      await sleep(2000)
    }
    
    video = await page.evaluate(() => {
      const $= window.$
      const it = $('source')
      if (it && it.length > 0) {
        return it.attr('src')
      }
      return ''
    })
    
    const data = {
      video,
      doubanId,
      cover: result.cover
    }
    
    process.send(data)
  }

  browser.close()
  process.exit(0)
})