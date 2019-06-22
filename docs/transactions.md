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

### Issue / ReIssue Transaction

Issue and ReIssue take the same format apart from the type

```
{
    "senderPublicKey":"2M25DqL2W4rGFLCFadgATboS8EPqyWAN3DjH12AH5Kdr",
    "quantity": 50000
    "fee": 50000000000,
    "description":"My New Token",
    "type":3 / 5,
    "version":2,
    "reissuable":true,
    "script":"base64:AQa3b8tH", // Optional Script for 'Smart Assets'
    "sender":"3Mz9N7YPfZPWGd4yYaX6H53Gcgrq6ifYiH7",
    "feeAssetId":null, // When paying using custom fees
    "chainId":84, // 84 (T) for testnet 90 (Z) for mainnet
    "proofs":["4yjVxzrLuXUq5y2QCa2LDn1Fp9P63hPBmqDLGQCqn41EB1uZ1pys79NP81h7FxRBnZSbpNGbz1xjwckHcPAQHmFX"],
    "decimals":2,
    "name":"MyTestToken"
    }
```

### Transfer Transaction

```
{
    "senderPublicKey":"4c5K4kGeRdrnSYZ9wngQKSozikVgfxmDEuViirsyUHwd",
    "amount":110000000
    fee":500000,
    "type":4,
    "version":2,
    "attachment":"",
    "sender":"3MyT3r1S8xvKtiKnLgVNNiSAiQdnMbffBQy",
    "feeAssetId":null,
    "proofs":["2KFbYWi9BJwDG9dbiJQzC9qJPpu4Ug8Ybs331fQbX9FAkEpEtrj9DKvwNG7cb2m98DV6NCoKH4MBVtGGFsnQWPV6"],
    "assetId":null, // If we are sending an asset, null for ZBS
    "recipient":"3MqEisFsWdhvDMAKBwZzZv4niVsfJJtxcaw",
    "feeAsset":null
}

```

### Burn Transaction

Burning tokens can be useful for systems where a token is used to activate or fund a service and once the service has been used the token can be burnt.

```
{
    "senderPublicKey":"HQWkhM5q6rtv8Z4MgKicfWdDyUABtr8md7ddgMDmZhuA",
    "amount":1000000,
    "fee":500000000,
    "type":6,
    "version":2,
    "sender":"3MpS4Bx7WtJtnFqxTTHWrMdiJBmpdWFbd35",
    "feeAssetId":null,
    "chainId": 84, // 84 (T) for testnet 90 (Z) for mainnet
    "proofs":["5VXSiBmexMLYRpYrFeTbz5Psf4MRxhpiwXjasDGMJHTnmQcjtRx8HkubEu4zYBT2NUQYpPUmwmSbowgts6YhxdHS"],"assetId":"CS9Nc8aiK1FmvBHsj7JN4zE7u2dQnDJ2557dWcZxFHGy" // The AssetId we wish to burn
}
```

### Exchange Transaction

```
{
    "senderPublicKey":"8QUAqtTckM5B8gvcuP7mMswat9SjKUuafJMusEoSn1Gy",
    "amount":1000000000,
    "fee":300000,
    "type":7,
    "version":2,
    "sellMatcherFee":30000,
    "buyMatcherFee":300000,
    "sender":"3N8aZG6ZDfnh8YxS6aNcteobN8eXTWHaBBd",
    "feeAssetId":null,
    "proofs":["4kBxzWXSzbM4jQbi8SmNtZeRJEwUkMzCezf8AQYeu5z124ajpKG9GVJZbHdnRWz9R1Key5opySDbKj6B4zTtZsNF"],
    "price":90,
    "id":"28biMwpgZVjAUk5iJnWvphaFgr8Tybwqe6s5JxGTdDWJ",
    "order2":
        {"version":2,
        "id":"GaCXusGNDkYZ8iciV3cuUKb7r4awESwocghJXnFyLxYk",
        "sender":"3MwBD8xZByEHAnwB69eexgVPAPD5ucw1Rna","senderPublicKey":"HHonWv97CD2XXgRNbny7aCWP8amgYatCaTEthq38P1Do","matcherPublicKey":"8QUAqtTckM5B8gvcuP7mMswat9SjKUuafJMusEoSn1Gy", //Obtained from https://matcher.testnet-0bsnetwork.com/matcher
        "assetPair":
            {
                "amountAsset":"4CFzLzP3vBHBev9GyeWm6AP7hm72qn6xELU1je5Wmq8L",
                "priceAsset":null
            },
            "orderType":"sell",
            "amount":10000000000,
            "price":90,
            "timestamp":1548657730301,
            "expiration":1551163330301,
            "matcherFee":300000,"signature":"2uX8CedW8oPXqktAwJLm9emFArUimxcXD9pqHnd2mEWJYYJuBChzk59fzB7DVeKnczmosJa4vfAvCzqY8DSoq4Rr","proofs":["2uX8CedW8oPXqktAwJLm9emFArUimxcXD9pqHnd2mEWJYYJuBChzk59fzB7DVeKnczmosJa4vfAvCzqY8DSoq4Rr"]
        },
    "order1":
        {
            "version":2,
            "id":"4EFqAQLW8S2Swo3dh5RZ5DXNtfQRDij7Y28RayN3vW7G",
            "sender":"3N5h5G6ToFR7cMMzdzR1hvUaMNuz7quCt4H","senderPublicKey":"He5xRqcQBzk1VbdH7GP3XdGbB7dLwsvEbyLfNAbVkunJ","matcherPublicKey":"8QUAqtTckM5B8gvcuP7mMswat9SjKUuafJMusEoSn1Gy", //Obtained from https://matcher.testnet-0bsnetwork.com/matcher
            "assetPair":
                {
                    "amountAsset":"4CFzLzP3vBHBev9GyeWm6AP7hm72qn6xELU1je5Wmq8L",
                    "priceAsset":null
                },
            "orderType":"buy",
            "amount":1000000000,
            "price":100,
            "timestamp":1548661139113,
            "expiration":1548661439111,
            "matcherFee":300000,"signature":"23mzQgZgjsKBCTLRLS8ktbtP6EZx3gABT9AF63UF4nuhS1o7XJgEGby2umhijo4t8yKuw1CmZ3UVab4A6vtod3H8","proofs":["23mzQgZgjsKBCTLRLS8ktbtP6EZx3gABT9AF63UF4nuhS1o7XJgEGby2umhijo4t8yKuw1CmZ3UVab4A6vtod3H8"]
            }
    }
```

### Lease Transaction

```
{
    "senderPublicKey":"FB5ErjREo817duEBBQUqUdkgoPctQJEYuG3mU7w3AYjc",
    "amount":1,
    "fee":500000000,
    "type":8,
    "version":2,
    "sender":"3Mps7CZqB9nUbEirYyCMMoA7VbqrxLvJFSB",
    "feeAssetId":null,
    "proofs":["fkWj6RkV722jhv72BY6Eo5BZ6N4T8nTPcmQVmoBs14Cv53W2VfRE7C9rT1TN4CZfAW2Y2YhVFm24NGZh75eBHq4"],"recipient":"3NCKpqzSnHmXhZEmqYy4U6RUKUAJDTxWgWP"
}
```


## Signing Transactions

Signing transactions manually is quite complex, and usually its best to use a library to do so, however if you find you dont have a library available for your platform of choice, you may need to do it manually. The process involves concatenting the byte values of fields from the transaction to create a long byte array, and signing this using Curve25519 and your private key, and inserting this into the transaction payload.

Rather than include excessive details here on how to do that, the below code sample in C Sharp should be readable enough to understand how the process works, and you can also examine the code of our other libraries as they are all open source. If you need specific details or guidance, please do contact us using the details on the [Front Page](index.md)

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Numerics;
using DictionaryObject = System.Collections.Generic.Dictionary<string, object>;
using org.whispersystems.curve25519.csharp;
using System.Reflection;
using org.whispersystems.curve25519;
using System.IO;
using Program;

namespace ZbsSignAndBroadcastDataTransaction
{
    class Program
    {


        /// <summary>
        ///  This is a raw demonstration of a Data transaction. It's purpose is to save data to the blockchain (Variable TransactionData) - The signing procedure is demonstrated below.
        /// </summary>


        // 3MqSRBfLsTzXssscX8crUH88zJegvyrd5WK
        // Seed Phrase: despair olive coconut design rubber proud silver rotate glow gloom extra income effort about summer
        // Private Key: Bq6dvj1v48EAyS34Nu6bZS7tWtaxgQnChQrJvxr5x1pM
        // Public Key: 7cgFXWXTGXemR2yHq1MYx8o7jVKq6Y4Y5bTyaJ478aeG
        // Replenish Balance: https://explorer.testnet-0bsnetwork.com/faucet

        private static readonly Curve25519 Cipher = Curve25519.getInstance(Curve25519.BEST);

        static void Main(string[] args)
        {

            byte Version = 1;
            byte TxType = 12;
            byte[] SenderPrivateKey;
            byte[] SenderPublicKey;
            byte[] transactionBytes;

            DateTime Timestamp = DateTime.UtcNow;


            SenderPrivateKey = Base58.Decode("Bq6dvj1v48EAyS34Nu6bZS7tWtaxgQnChQrJvxr5x1pM"); // These are obtained from the client. X25519 Keys
            SenderPublicKey = Base58.Decode("7cgFXWXTGXemR2yHq1MYx8o7jVKq6Y4Y5bTyaJ478aeG");



            var TransactionData = new DictionaryObject
            {
                { "test num", (long)1 },
                { "test true", true },
                { "test bytes", new byte[] { 1, 2, 3, 4, 5}},
                { "test string", "Hello!"}
            };


            // To create a signature, we create a byte array.

            using (var stream = new MemoryStream())
            using (var writer = new BinaryWriter(stream))
            {
                writer.Write(TxType);  // First we add the Transaction Type (Its a number.. 12 is Data transaction)
                writer.Write(Version);  // Transaction version is set to 1
                writer.Write(SenderPublicKey);
                writer.WriteShort((short)TransactionData.Count); // Next we set the number of data items we are sending, in this case, theres 4 (TransactionData)

                foreach (var pair in TransactionData)  // For each data item we need to add its Length, Key and its value
                {
                    var key = Encoding.UTF8.GetBytes(pair.Key);
                    writer.WriteShort((short)key.Length);
                    writer.Write(key);
                    writer.WriteObject(pair.Value);
                }

                writer.WriteLong(Timestamp.ToLong());
                writer.WriteLong(3000000); //Arbitary fee

                transactionBytes = stream.ToArray();

            }


            // Next we take the byte array and sign it to generate a Proof.
            var proof = Cipher.calculateSignature(SenderPrivateKey, transactionBytes);


            // And finally, create a JSON payload to broadcast the transaction to the network


            var finalTransaction = new DictionaryObject
            {
                {"type", (byte) 12},
                {"version", Version},
                {"senderPublicKey", SenderPublicKey.ToBase58() },
                {"sender", "3MqSRBfLsTzXssscX8crUH88zJegvyrd5WK" },
                {"data", TransactionData.Select(pair => new DictionaryObject // Add each data entry to the JSON payload
                {
                    {"key", pair.Key},
                    {"type", pair.Value is long ? "integer" : (pair.Value is bool ? "boolean" : (pair.Value is string ? "string"  : "binary"))},
                    {"value", pair.Value is byte[] bytes ? bytes.ToBase64() : pair.Value }
                })},
                {"fee", 3000000}, //Arbitary fee
                {"timestamp", Timestamp.ToLong()},
                {"proofs", new string[] { proof.ToBase58()} } // Add the signature to the JSON

            };



            String TestNetHost = "https://node1.testnet-0bsnetwork.com";

            var response = Http.Post(TestNetHost + "/transactions/broadcast", finalTransaction); // Broadcast the transaction to a public node on the network

            Console.Write(response); // Output the response
            Console.Read();


    }
    }
}

```