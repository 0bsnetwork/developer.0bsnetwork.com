const constants = require('./constants')
const { burn, broadcast } = require('@0bsnetwork/zbs-transactions')

const signedTx = burn({
    quantity: 1,
    assetId: 'BiuhdjnH9qxgfax52zXgJw3b5ArxCdA4q8kYECqWoEYT',
    chainId: 'T'
}, constants.DATA.SEED)

broadcast(signedTx, constants.DATA.NODE_URL)
    .then(resp => console.log(resp))
    .catch(e => console.error(`.catch(${e})`));