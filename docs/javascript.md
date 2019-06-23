## Javascript Library

Using this library you can easily create and sign transactions for 0bsnetwork blockchain.
It also allows you to multi-sign existing transactions or create them without signature at all.


### Transactions

The idea is really simple - you create transaction and sign it from a minimal set of required params.
If you want to create a Transfer transaction the minimum you need to provide is **amount** and **recipient** as defined in [Transfer params](transactions.md):
```js

const { transfer } = require('@0bsnetwork/zbs-transactions')
const seed = 'some example seed phrase'
const signedTranserTx = transfer({
  amount: 1,
  recipient: '3P6fVra21KmTfWHBdib45iYV6aFduh4WwC2',
  //Timestamp is optional but it was overridden, in case timestamp is not provided it will fallback to Date.now(). You can set any oftional params yourself. go check full docs
  timestamp: 1536917842558
}, seed)
```

Output will be a signed transfer transaction:
```js
{
  id: '8NrUwgKRCMFbUbqXKQAHkGnspmWHEjKUSi5opEC6Havq',
  type: 4,
  version: 2,
  recipient: '3P6fVra21KmTfWHBdib45iYV6aFduh4WwC2',
  attachment: undefined,
  feeAssetId: undefined,
  assetId: undefined,
  amount: 1,
  fee: 100000,
  senderPublicKey: '6nR7CXVV7Zmt9ew11BsNzSvVmuyM5PF6VPbWHW9BHgPq',
  timestamp: 1536917842558,
  proofs: [
    '25kyX6HGjS3rkPTJRj5NVH6LLuZe6SzCzFtoJ8GDkojY9U5oPfVrnwBgrCHXZicfsmLthPUjTrfT9TQL2ciYrPGE'
  ]
}
```

You can also create transaction, but not sign it:
```javascript
const unsignedTransferTx = transfer({
  amount: 1,
  recipient: '3P6fVra21KmTfWHBdib45iYV6aFduh4WwC2',
  //senderPublicKey is required if you omit seed
  senderPublicKey: '6nR7CXVV7Zmt9ew11BsNzSvVmuyM5PF6VPbWHW9BHgPq'
})
```

Now you are able to POST it to 0bsNetwork or store for future purpose or you can add another signature from other party:
```js
const otherPartySeed = 'other party seed phrase'
const transferSignedWithTwoParties = transfer(signedTranserTx, seed)
```

So now there are two proofs:
```js
{
  id: '8NrUwgKRCMFbUbqXKQAHkGnspmWHEjKUSi5opEC6Havq',
  type: 4,
  version: 2,
  recipient: '3P6fVra21KmTfWHBdib45iYV6aFduh4WwC2',
  attachment: undefined,
  feeAssetId: undefined,
  assetId: undefined,
  amount: 1,
  fee: 100000,
  senderPublicKey: '6nR7CXVV7Zmt9ew11BsNzSvVmuyM5PF6VPbWHW9BHgPq',
  timestamp: 1536917842558,
  proofs: [
    '25kyX6HGjS3rkPTJRj5NVH6LLuZe6SzCzFtoJ8GDkojY9U5oPfVrnwBgrCHXZicfsmLthPUjTrfT9TQL2ciYrPGE',
    'CM9emPzpe6Ram7ZxcYax6s7Hkw6698wXCMPSckveFAS2Yh9vqJpy1X9nL7p4RKgU3UEa8c9RGXfUK6mFFq4dL9z'
  ]
}
```

### Broadcast
To send transaction you can use either node api or broadcast helper function:
```javascript
const {broadcast} =  require('@0bsnetwork/zbs-transaction');
const nodeUrl = 'https://node1.testnet-0bsnetwork.com';

broadcast(signedTx, nodeUrl).then(resp => console.log(resp))
```

## Transaction Examples


### Issue
```
const { issue, broadcast } = require('@0bsnetwork/zbs-transactions')
const signedTx = issue(
    {
        name: 'MyTestToken',
        description: 'My New Token',
        quantity: 50000,
        chainId: 'T'
    }, "Write your SEED here")

broadcast(signedTx, "https://node1.testnet-0bsnetwork.com")
    .then(resp => console.log(resp))
    .catch(e => console.error(`.catch(${e})`));
```

### Reissue:
```
const { reissue, broadcast } = require('@0bsnetwork/zbs-transactions')
const signedTx = reissue({
    quantity: 5000000,
    assetId: '5cfyua2DBmLcWYjh6D3k8ra3xNc6Ap47BSGr9rujciy6',
    reissuable: false,
    chainId: 'T'
}, "Write your SEED here")

broadcast(signedTx, "https://node1.testnet-0bsnetwork.com")
    .then(resp => console.log(resp))
    .catch(e => console.error(`.catch(${e})`));
```

### Transfer Transaction
```
const { transfer, broadcast } = require('@0bsnetwork/zbs-transactions')
const signedTx = transfer({
  amount: 1,
  recipient: '3NCGfpFCVCmMSgCSct8BhExjRZ3E8i83Goo',
  fee: 5000000
}, "Write your SEED here")

broadcast(signedTx, "https://node1.testnet-0bsnetwork.com")
    .then(resp => console.log(resp))
    .catch(e => console.error(`.catch(${e})`));
```

### Burn Transaction

Burning tokens can be useful for systems where a token is used to activate or fund a service and once the service has been used the token can be burnt.
```
const constants = require('./constants')
const { burn, broadcast } = require('@0bsnetwork/zbs-transactions')

const signedTx = burn({
    quantity: 1,
    assetId: 'BiuhdjnH9qxgfax52zXgJw3b5ArxCdA4q8kYECqWoEYT',
    chainId: 'T'
}, "Write your SEED here")

broadcast(signedTx, "https://node1.testnet-0bsnetwork.com")
    .then(resp => console.log(resp))
    .catch(e => console.error(`.catch(${e})`));
```

### Exchange Transaction


### Lease Transaction
```
const { lease, broadcast } = require('@0bsnetwork/zbs-transactions')
const signedTx = lease(
    {
        amount: 100000,
        recipient: '3NBTZJ6BpuQeRCciQzYRVrFwyhrUcsf6f6M',
    }, "Write your SEED here")

broadcast(signedTx, "https://node1.testnet-0bsnetwork.com")
    .then(resp => console.log(resp))
    .catch(e => console.error(`.catch(${e})`));
```

### Lease Cancel
```
const { cancelLease, broadcast } = require('@0bsnetwork/zbs-transactions')
const signedTx = cancelLease(
    {
        leaseId: 'HxJrij7Ba7ojaovjrZcvAaXAwMBMr9BkAyXLsdiiWtkF',
        chainId: 'T'
    }, "Write your SEED here")

broadcast(signedTx, "https://node1.testnet-0bsnetwork.com")
    .then(resp => console.log(resp))
    .catch(e => console.error(`.catch(${e})`));
```

### Create Alias
```
const { alias, broadcast } = require('@0bsnetwork/zbs-transactions')
const signedTx = alias(
    {
        alias: 'New Alias',
        chainId: 'T',
        fee: 100000
    }, "Write your SEED here")

broadcast(signedTx, "https://node1.testnet-0bsnetwork.com")
    .then(resp => console.log(resp))
    .catch(e => console.error(`.catch(${e})`));
```

### Mass Transfer
```
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
]}, "Write your SEED here")

broadcast(signedTx, "https://node1.testnet-0bsnetwork.com")
    .then(resp => console.log(resp))
    .catch(e => console.error(`.catch(${e})`));
```

### Data
```
const { data, broadcast } = require('@0bsnetwork/zbs-transactions')

const signedTx = data(
    { data: [
            { key: 'integerVal', value: 1 },
            { key: 'booleanVal', value: true },
            { key: 'stringVal', value: 'hello' },
            { key: 'binaryVal', value: [1, 2, 3, 4] }
        ]
    }, "Write your SEED here")

broadcast(signedTx, "https://node1.testnet-0bsnetwork.com")
    .then(resp => console.log(resp))
    .catch(e => console.error(`.catch(${e})`));
```
### SetScript

### CustomFee Enable

### Set Asset

### Invoke Script



### Index
Example code:
```
const { transfer, broadcast } = require('@0bsnetwork/zbs-transactions')
const signedTx = transfer({
  amount: 1,
  recipient: '3NCGfpFCVCmMSgCSct8BhExjRZ3E8i83Goo',
  fee: 5000000,
  chainId: 'T'
}, "Write your SEED here")

broadcast(signedTx, "https://node1.testnet-0bsnetwork.com")
    .then(resp => console.log(resp))
    .catch(e => console.error(`.catch(${e})`));
```

## Signing Transactions

Signing transactions manually is quite complex, and usually its best to use a library to do so, however if you find you dont have a library available for your platform of choice, you may need to do it manually. The process involves concatenting the byte values of fields from the transaction to create a long byte array, and signing this using Curve25519 and your private key, and inserting this into the transaction payload.

Rather than include excessive details here on how to do that, the below code sample in C Sharp should be readable enough to understand how the process works, and you can also examine the code of our other libraries as they are all open source. If you need specific details or guidance, please do contact us using the details on the [Front Page](index.md)


### Sponsorship
```
const { sponsorship, broadcast } = require('@0bsnetwork/zbs-transactions')
const signedTx = sponsorship(
    {
        assetId: 'BiuhdjnH9qxgfax52zXgJw3b5ArxCdA4q8kYECqWoEYT',
        minSponsoredAssetFee: 100,
    }, constants.DATA.SEED)

broadcast(signedTx, constants.DATA.NODE_URL)
    .then(resp => console.log(resp))
    .catch(e => console.error(`.catch(${e})`));
```