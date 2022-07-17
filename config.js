const toBool = (x) => x == 'true'
const { Sequelize } = require('sequelize')


const { existsSync } = require('fs')
if (existsSync('config.env')) require('dotenv').config({ path: './config.env' })
const DATABASE_URL =
	process.env.DATABASE_URL === undefined
		? './database.db'
		: process.env.DATABASE_URL

module.exports = {
	VERSION: '2.2.7',
	SESSION_ID: process.env.SESSION_ID || '',
	DATABASE:
		DATABASE_URL === './database.db'
			? new Sequelize({
					dialect: 'sqlite',
					storage: DATABASE_URL,
					logging: false,
			  })
			: new Sequelize(DATABASE_URL, {
					dialect: 'postgres',
					ssl: true,
					protocol: 'postgres',
					dialectOptions: {
						native: true,
						ssl: { require: true, rejectUnauthorized: false },
					},
					logging: false,
			  }),
	HANDLERS: process.env.PREFIX || '^[.,!]',
	SUDO: process.env.SUDO || '',
	HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
	HEROKU_API_KEY: process.env.HEROKU_API_KEY,
	BRANCH: 'master',
	STICKER_PACKNAME: process.env.STICKER_PACKNAME || '❤️,LyFE',
	ALWAYS_ONLINE: toBool(process.env.ALWAYS_ONLINE) || false,
	LOG_MSG: toBool(process.env.LOG_MSG) || false,
	RMBG_KEY: process.env.RMBG_KEY || 'null',
	BAILEYS_LOG_LVL: process.env.BAILEYS_LOG_LVL || 'silent',
	LANG: (process.env.LANGUAG || 'en').toLowerCase(),
}
