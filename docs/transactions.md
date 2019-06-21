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

