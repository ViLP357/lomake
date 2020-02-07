const logger = require('@util/logger')
const db = require('@models/index')

const userMiddleware = async (req, res, next) => {
  if (req.path.includes('socket.io')) next()
  if (!req.headers.uid) return res.status(400).json({ error: 'missing uid' })
  try {
    const [user, created] = await db.user.findOrCreate({
      where: {
        uid: req.headers.uid
      },
      defaults: {
        name: `${req.headers.givenname} ${req.headers.sn}`,
        email: req.headers.mail,
        admin: false,
        access: false,
        irrelevant: false
      }
    })
    if (created) logger.info(`New user: ${user.name}, ${user.email}`)
    req.user = user

    next()
  } catch (error) {
    logger.error('Database error:', error)
  }
}

module.exports = userMiddleware
