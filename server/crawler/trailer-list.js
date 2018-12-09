const puppeteer = require('puppeteer')

const url = `https://movie.douban.com/explore#!type=movie&tag=%E7%83%AD%E9%97%A8&sort=time&page_limit=20&page_start=0`

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

;(async () => {
  console.log('Start visit the target page')

  const browser = await puppeteer.launch({
    args: ['--no-sandbox'], // 去沙箱模式
    dumpio: false
  })

  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: 'networkidle2' // 等到空闲
  })

  await sleep(3000)

  await page.waitForSelector('.more')

  for (let i = 0; i <= 1; i++) {
    await sleep(3000)
    await page.click('.more')
  }

  const result = await page.evaluate(() => {
    const $ = window.$
    const items = $('.list-wp .list a')
    const links = []

    if (items.length >= 1) {
      items.each((index, item) => {
        const it = $(item)
        const doubanId = it.find('div').data('id')
        const title = it.find('img').attr('alt')
        const rate = Number(it.find('strong').text())
        const poster = it.find('img').attr('src').replace('s_ratio', 'l_ratio')

        links.push({
          doubanId,
          title,
          rate,
          poster
        })
      })
    }

    return links
  })

  browser.close()
  // console.log(result)
  process.send({result})
  process.exit(0)
})()