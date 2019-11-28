## Smart Contracts

Smart Contracts pn our platform allow to change the default behaviour of accounts and assets.

Smart contracts are:

- Scripts written using RIDE programming language.
- Predicates over account or asset transactions, which always should return true or false.
- Always passive and not callable.

Smart Contract Script has access to:

- Blockchain height. There is height() function in the global scope of a script which returns the blockchain height at the execution time.
- Current transaction fields. There is tx variable in the global scope of a script which contains all fields of current outgoing transaction, including proofs array.

> Proofs array is not available in an asset script.

- Proofs. Any transaction can contain an array of proofs up to 8 elements. By default proofs array used for signatures, but you can put any data in the array (each element is up to 64 bytes).

- Key-value storage of any account. Data saved by a data transaction.


### Smart Accounts

0bsNetwork uses an account-based model, there are no inputs and outputs of transactions like in some other blockchain networks. All assets and data associates with an account and bound to its' public key.

> By default, public key “owns” assets and stores key-value data attached by data transactions. To spend funds or update key-value storage the sender provides a valid signature matching transaction body and public key.

The main idea that before the transaction is submitted to be included in the next block, the account checks if the transaction meets certain requirements, defined in a script. The script is attached to the account so the account can validate every transaction before confirming it.

Smart contract (account script) allows us to change the default behaviour of an account by sending a setScriptTransaction. It's important that the smart account does not store any data on the blockchain. A smart account will only have access to blockchain state values that can be retrieved and executed relatively fast, in a “constant” time.

Any normal account/address can become a smart account.


#### How to work with state

If you're familiar with Ethereum smart contracts model you have to consider the main difference between them and our Smart Contracts:

0bsnetwork smart contracts do not have their own state.

There is a smart account state managed by data transactions. If you need to work with state you have to use data transactions and manage them with smart account scripts.

#### Gas and fees

The simplicity of account scripts makes the system very scalable in terms of throughput and smart accounts work
without “gas”, which means that costs are always known upfront. Transactions from smart account or with smart asset require additional an additional fee documented in [transactions](transactions.md)

#### Restrictions
Smart accounts cannot send transactions themselves or transfer funds according to given conditions, but can read data from the blockchain (for example, the height of a blockchain or signatures from the transaction) and return the result of a predicate obtained on the basis of this data.

### Smart Assets
If we plan to apply constraints on all operations for a specific asset, we cannot use a smart account. In our paradigm we have smart assets for this purpose: the script will be attached to the asset and will work in a similar way. Transactions for such assets are valid only if the script returns True. For example, a script can verify proofs from a transaction, check if a notary/escrow approves the transaction, and that operations with the asset are not locked for a specified time. The script for the token is invoked upon the following operations with an asset:

- Transfer Transaction
- MassTransfer Transaction
- Reissue Transaction
- Burn Transaction
- ExchangeTransaction
- SetAssetScriptTransaction

### Getting Started

The best way to get started with RIDE and smart contracts is to dive right in and check out some examples, the lanuage is easy and readable, and our [IDE](https://ide.0bsnetwork.com) already has samples pre-installed that you can load up.

### Smart Account Examples

##### An account can trade only with BTC
```
let cooperPubKey = base58'BVqYXrapgJP9atQccdBPAgJPwHDKkh6A8'
let BTCId = base58'BTC Asset ID'
match tx {
   case o: Order =>
      sigVerify(tx.bodyBytes, tx.proofs[0], cooperPubKey ) && (o.assetPair.priceAsset == BTCId || o.assetPair.amountAsset == BTCId)
   case _ => sigVerify(tx.bodyBytes, tx.proofs[0], cooperPubKey )
}

```


##### Buy back custom asset on specified price in ZBS

```
let myAssetId = base58'BVqYXrapgJP9atQccdBPAgJPwHDKkh6B9'
let cooperPubKey = base58'BVqYXrapgJP9atQccdBPAgJPwHDKkh6A8'

match tx {
   case o: Order =>
      o.assetPair.priceAsset == base58'' && o.assetPair.amountAsset == myAssetId && o.price == 500000 && o.amount == 1000 && o.orderType == Buy
   case _ => sigVerify(tx.bodyBytes, tx.proofs[0], cooperPubKey )

}

```

### Smart Asset Examples

##### Issue an unburnable asset

To issue an unburnable asset you can use pattern matching with a false value to BurnTransaction:

```
match tx {
  case t : BurnTransaction => false
  case _ => true
}
```


##### Asset

You can freeze your assets till the certain height by defining a target height variable:

```
let targetHeight = 1500000
height >= targetHeight
```


##### Getting a share after each asset transfer

For requiring a fee in a certain asset to get a share after each transfer you can use TransferTransaction depending on the asset id:

```
match tx {
  case t : TransferTransaction =>
    t.feeAssetId == base58'oWgJN6YGZFtZrV8BWQ1PGktZikgg7jzGmtm16Ktyvjd'
  case _ => true
}
```


##### Transferring by issuer permission

You can restrict the token transfer option to be done only by the token issuer's permission (commitment/debt label):
```
match tx {
  case tx : TransferTransaction =>
    let issuer = Address(base58'3P6ms9EotRX8JwSrebeTXYVnzpsGCrKWLv4')
    isDefined(getInteger(issuer, toBase58String(tx.id)))
  case _ => false
}
```


##### Issue an untransferable asset

To make the asset untransferable, you can assign a false value to TransferTransaction, MassTransferTransaction and ExchangeTransaction:

```
match tx {
  case t : TransferTransaction | MassTransferTransaction | ExchangeTransaction => false
  case _ => true
}
```


##### Asset tradable only with BTC

To allow asset trading only with bitcoins you can do as here:

```
let BTCId = base58'8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS'
match tx {
  case t : ExchangeTransaction =>
    t.sellOrder.assetPair.priceAsset == BTCId || t.sellOrder.assetPair.amountAsset == BTCId
  case _ => true
}
```


##### Require using a certain matcher

To define a certain matcher, you can assign the matcher address as a sender value:

```
match tx {
  case t : ExchangeTransaction =>
    t.sender == addressFromString("3PJaDyprvekvPXPuAtxrapacuDJopgJRaU3")
  case _ => true
}
```

##### Only allow data transactions and where longitude and latitude are within some limits

Treat the long and lat as integers. Send a data transaction that should be within this box.
This is only a demo to show how a contract can limit data. Ideally one should check against some data that can be changed, such as another address where data is uploaded via a data contract. However, this should be sufficient to demo the concept.

```
match (tx) {
  case dtx:DataTransaction => (
    let payloadSize = size(dtx.data)
    let longitude = dtx.data[0].key
    let latitude = dtx.data[1].key
    let longitudeAsInteger = extract(getInteger(dtx.data, longitude))
    let latitudeAsInteger = extract(getInteger(dtx.data, latitude))

    if (longitudeAsInteger > 1620000 && longitudeAsInteger < 1640000 && latitudeAsInteger < 4820000 && latitudeAsInteger > 4810000 ) then (
        true
    )
    else
    (
        false
    )
  )

  case _ =>
        false
  }
```