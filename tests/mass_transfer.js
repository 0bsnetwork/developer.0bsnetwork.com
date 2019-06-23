const constants = require('./constants')
const { massTransfer, broadcast } = require('@0bsnetwork/zbs-transactions')

const signedTx = massTransfer({transfers: [
  {
    amount: 1,
    recipient: '3NCGfpFCVCmMSgCSct8BhExjRZ3E8i83Goo',
    fee: 1000000
  },
  {
    amount: 1,
    recipient: '3NCGfpFCVCmMSgCSct8BhExjRZ3E8i83Goo',
    fee: 1000000
  },
]}, constants.DATA.SEED)

broadcast(signedTx, constants.DATA.NODE_URL)
    .then(resp => console.log(resp))
    .catch(e => console.error(`.catch(${e})`));