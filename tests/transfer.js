const constants = require('./constants')
const { transfer, broadcast } = require('@0bsnetwork/zbs-transactions')
const signedTx = transfer({
  amount: 1,
  recipient: '3NCGfpFCVCmMSgCSct8BhExjRZ3E8i83Goo',
  fee: 5000000,
  chainId: 'T'
}, constants.DATA.SEED)

broadcast(signedTx, constants.DATA.NODE_URL)
    .then(resp => console.log(resp))
    .catch(e => console.error(`.catch(${e})`));