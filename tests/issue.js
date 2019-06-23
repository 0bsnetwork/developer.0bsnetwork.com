const constants = require('./constants')
const { issue, broadcast } = require('@0bsnetwork/zbs-transactions')
const signedTx = issue(
    {
        name: 'Test token name',
        description: 'It is a gaming token',
        quantity: 1000000,
        chainId: 'T'
    }, constants.DATA.SEED)

broadcast(signedTx, constants.DATA.NODE_URL)
    .then(resp => console.log(resp))
    .catch(e => console.error(`.catch(${e})`));