module.exports = {
  secretOrKey: 'secretOrKey',
  port: process.env.NODE_ENV.port || '4011',
  smtp: {
    url: 'smt-url',
    user: 'smtp-user',
    password: 'cosport1024'
  },
  uploadPath: '/home/antoine/dev/tmp',
  origins: [
    'http://localhost:3000',
    'http://localhost:4011',
  ]
}