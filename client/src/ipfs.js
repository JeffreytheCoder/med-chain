const ipfsClient = require('ipfs-http-client')

const projectId = '2DKPh21wsRUiB27R526EOCo4eUV'
const projectSecret = '1bc14260235b4fb8844b4d86b0113876'
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')

const ipfs = ipfsClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
})

export default ipfs
