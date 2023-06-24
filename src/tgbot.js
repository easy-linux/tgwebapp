import path from "node:path";
import url from "node:url";
import { Telegraf, Markup } from "telegraf";

const gameShortName = 'marsattack'
const appUrl = `https://${process.env.DOMAIN}`
const webhookDomain = process.env.DOMAIN

export const initBot = (app) => {
    const bot = new Telegraf(process.env.BOT_TOKEN)
    bot.use(Telegraf.log())
    const pathUrl = bot.secretPathComponent()
    bot.telegram.setWebhook(`${appUrl}/${pathUrl}`)
    app.use(bot.webhookCallback(`/${pathUrl}`))

    bot.start(ctx => ctx.replyWithGame(gameShortName))

    bot.gameQuery(ctx => {
        return ctx.answerGameQuery(`${appUrl}`)
    })
}