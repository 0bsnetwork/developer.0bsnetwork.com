const constants = require('./constants')
const { sponsorship, broadcast } = require('@0bsnetwork/zbs-transactions')
const signedTx = sponsorship(
    {
        assetId: 'BiuhdjnH9qxgfax52zXgJw3b5ArxCdA4q8kYECqWoEYT',
        minSponsoredAssetFee: 100,
    }, constants.DATA.SEED)

broadcast(signedTx, constants.DATA.NODE_URL)
    .then(resp => console.log(resp))
    .catch(e => console.error(`.catch(${e})`));