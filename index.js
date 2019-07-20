const Telegraf = require('telegraf')
const axios = require('axios')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.context.pdf = {
  getLine: (line) => {
    return axios.get(`https://www.startromagna.it/downloads/orari/Rimini_Linea_${line}.pdf`, { responseType: 'stream' })
      .then(res => res.data)
  }
}

async function sendTimetable (ctx) {
  try {
    const numero = ctx.message.text.split(' ')[1]
    ctx.reply(`Un attimo che recupero la linea ${numero}...`)
    const file = await ctx.pdf.getLine(numero)
    await ctx.telegram.sendDocument(ctx.from.id, {
      source: file,
      filename: `${numero}.pdf`
    })
  } catch (error) {
    console.log(error)
    return ctx.reply('Impossibile recuperare il documento, hai dato il numero della linea correttamente ?')
  }
}

bot.command('start', ctx => ctx.reply('Ciao, scrivi /bus {numero_linea} per avere gli orari di quella linea'))

bot.command('bus', sendTimetable)
bot.command('linea', sendTimetable)

bot.launch()