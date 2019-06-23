const constants = require('./constants')
const { lease, broadcast } = require('@0bsnetwork/zbs-transactions')
const signedTx = lease(
    {
        amount: 100000,
        recipient: '3NBTZJ6BpuQeRCciQzYRVrFwyhrUcsf6f6M',
    }, constants.DATA.SEED)

broadcast(signedTx, constants.DATA.NODE_URL)
    .then(resp => console.log(resp))
    .catch(e => console.error(`.catch(${e})`));