const constants = require('./constants')
const { alias, broadcast } = require('@0bsnetwork/zbs-transactions')
const signedTx = alias(
    {
        alias: 'jkdc',
        chainId: 'T',
        fee: 100000
    }, constants.DATA.SEED)

broadcast(signedTx, constants.DATA.NODE_URL)
    .then(resp => console.log(resp))
    .catch(e => console.error(`.catch(${e})`));