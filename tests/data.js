const constants = require('./constants')
const { data, broadcast } = require('@0bsnetwork/zbs-transactions')

const signedTx = data(
    { data: [
            { key: 'integerVal', value: 1 },
            { key: 'booleanVal', value: true },
            { key: 'stringVal', value: 'hello' },
            { key: 'binaryVal', value: [1, 2, 3, 4] }
        ]
    }, constants.DATA.SEED)

broadcast(signedTx, constants.DATA.NODE_URL)
    .then(resp => console.log(resp))
    .catch(e => console.error(`.catch(${e})`));