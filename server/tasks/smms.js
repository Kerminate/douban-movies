const path = require('path')
const fs = require('fs-extra')
const request = require('request')
const rp = require('request-promise-native')
const axios = require('axios')
const FormData = require('form-data')

const downResources = (url, imgPath) => {
  return new Promise((resolve, reject) => {
    request
      .get(url)
      .pipe(fs.createWriteStream(imgPath))
      .on('finish', () => {
        resolve()
      })
  })
}

;(async () => {
  const url = 'https://img3.doubanio.com/img/trailer/medium/2538717114.jpg?'
  const fileName = 'net1.png'
  const imgPath = path.resolve(__dirname, '../../static/net1.jpg')
  try {
    await downResources(url, imgPath)
    const buffer = await fs.readFile(imgPath)
    const base64Image = Buffer.from(buffer).toString('base64')
    console.log(buffer)
    console.log(Buffer.isBuffer(buffer))
    console.log(imgPath)
    // const options = {
    //   method: 'POST',
    //   uri: 'https://sm.ms/api/upload',
    //   headers: {
    //     contentType: 'multipart/form-data',
    //   },
    //   formData: {
    //     smfile: {
    //       value: Buffer.from(base64Image, 'base64'),
    //       options: {
    //         filename: fileName
    //       }
    //     }
    //   }
    // }
    // let body = await rp(options)

    const form = new FormData()
    form.append('smfile', Buffer.from(base64Image, 'base64'), {
      filename: fileName
    })
    const body = await axios
      .create({
        headers: form.getHeaders()
      })
      .post('https://sm.ms/api/upload', form)
    console.log(body.data)
  } catch (err) {
    console.log(err)
  }
})()