const constants = require('./constants')
const { reissue, broadcast } = require('@0bsnetwork/zbs-transactions')

const signedTx = reissue({
    quantity: 5000000,
    assetId: '5cfyua2DBmLcWYjh6D3k8ra3xNc6Ap47BSGr9rujciy6',
    reissuable: false,
    chainId: 'T'
}, constants.DATA.SEED)

broadcast(signedTx, constants.DATA.NODE_URL)
    .then(resp => console.log(resp))
    .catch(e => console.error(`.catch(${e})`));