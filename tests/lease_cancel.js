const constants = require('./constants')
const { cancelLease, broadcast } = require('@0bsnetwork/zbs-transactions')
const signedTx = cancelLease(
    {
        leaseId: 'HxJrij7Ba7ojaovjrZcvAaXAwMBMr9BkAyXLsdiiWtkF',
        chainId: 'T'
    }, constants.DATA.SEED)

broadcast(signedTx, constants.DATA.NODE_URL)
    .then(resp => console.log(resp))
    .catch(e => console.error(`.catch(${e})`));