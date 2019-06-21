# Transactions

## Transaction Types

Each transaction type is given an integer to represent it as follows

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

Extra Fee: 0.01

## Transaction Formats

The below sections demonstrate the JSON transaction format that is required to make a transaction. When signing a transaction on a Node, you can exclude the signature/proofs field as the server will give you this back.

### Issue Transaction

```
{
    "senderPublicKey":"2M25DqL2W4rGFLCFadgATboS8EPqyWAN3DjH12AH5Kdr",
    "quantity":50000
    "fee":100000000,
    "description":"Script true.",
    "type":3,
    "version":2,
    "reissuable":true,
    "script":"base64:AQa3b8tH",
    "sender":"3Mz9N7YPfZPWGd4yYaX6H53Gcgrq6ifYiH7",
    "feeAssetId":null,
    "chainId":84,
    "proofs":["4yjVxzrLuXUq5y2QCa2LDn1Fp9P63hPBmqDLGQCqn41EB1uZ1pys79NP81h7FxRBnZSbpNGbz1xjwckHcPAQHmFX"],"assetId":"7Xpp9PPeZbG4wboJrcbRQdq3SxCJqbeFRUjjKccM1DsD",
    "decimals":2,
    "name":"Smart"
    }
```