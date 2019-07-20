const Telegraf = require('telegraf')
const axios = require('axios')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.context.pdf = {
  getLine: (line) => {
    return axios.get(`https://www.startromagna.it/downloads/orari/Rimini_Linea_${line}.pdf`, { responseType: 'stream' })
      .then(res => res.data)
  }
}

bot.on('text', async (ctx) => {
  try {
    const numero = ctx.message.text
    const file = await ctx.pdf.getLine(numero)
    await ctx.telegram.sendDocument(ctx.from.id, {
      source: file,
      filename: `${numero}.pdf`
    })
  } catch (error) {
    console.log(error)
    return ctx.reply('Impossibile recuperare il documento, hai dato il numero della linea correttamente ?')
  }
})

bot.launch()