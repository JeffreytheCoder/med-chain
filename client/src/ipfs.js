const ipfsClient = require('ipfs-api')

const projectId = process.env.REACT_APP_IPFS_PROJECT_ID
const projectSecret = process.env.REACT_APP_IPFS_PROJECT_SECRET
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
