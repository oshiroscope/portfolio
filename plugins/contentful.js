const contentful = require('contentful')
// なぜかexport defaultだとnetlifyが失敗する
// module.exports = contentful.createClient({
export default contentful.createClient({
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_ACCESS_TOKEN
})
