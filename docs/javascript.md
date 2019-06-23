# Transactions

## Transaction Types

Each transaction type is given an integer to represent it as follows. The transaction fee is included below too, though libraries should have these set by default.

| Transaction Type | Name          | Description                                  | Fee (ZBS)   |
| ---------------- | ------------- | ---------------------------------------------| ------------|
| 3                | Issue         | Create a new token / asset                   | 500.00      |
| 4                | Transfer      | Send ZBS or Token to another address         | 0.05        |
| 5                | ReIssue       | Issue more of your token                     | 200.00      |
| 6                | Burn          | Destroy X tokens                             | 5.00        |
| 7                | Exchange      | A Trade. Buy / Sell                          | 0.20        |
| 8                | Lease         | Start leasing to another address             | 5.00        |
| 9                | LeaseCancel   | Cancel a Lease                               | 1.00        |
| 10               | CreateAlias   | Create an alias for your address             | 10          |
| 11               | MassTransfer  | Send up to 100 Transfers in 1 transaction    | 0.05        |
| 12               | Data          | Save data to the blockchain                  | 0.03        |
| 13               | SetScript     | Add a script to an Address                   | 10.00       |
| 14               | CustomFee     | Setup a Custom Fee for your Asset            | 50.00       |
| 15               | SetAsset      | Set a script on an asset                     | 10.00       |
| 16               | ContractInvoke| Run a contract                               | 0.10        |
| 17               | Index         |                                              |             |

Extra Fee: 0.01 (In addition to fee when operating with smart assets or accounts)

## Transaction Formats

The below sections demonstrate code transaction format that is required to make a transaction. When signing a transaction on a Node, you can exclude the signature/proofs field as the server will give you this back.

> Within the transaction JSON, Fee's are expressed without decimal values, so ZBS has 8 decimal places, and 100000000 represents 1 ZCL within the transaction JSON.

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

