## Tutorials

... More Coming Soon! ...

### Smart Contract


#### 1. Creating and deploying a script manually

The idea of a **Smart Account** is the following:

Before the transaction is submitted to be included in the next block, the account checks if the transaction meets certain requirements, defined in a **script**. The **script** is attached to the account so the account can validate every transaction before confirming it.

In this example, we're going to create and deploy a simple 2 of 2 MultiSig example.

**Example Assumptions:**

1. We assume that we have our own node.
2. We want to set up a script for an account in order to implement the **smart account** idea.
3. we assume that we have three generated addresses:

`3MxjWXEUcVCeiaEUqNcorB5HxSpLsgJCGxE` - Alice's account.

`3MqGVvfgqdqqU6P9mTAsLSxyRoRjrHF18Mf` - Bob's account.

`3N7H4jTBMKtZfNCY86K2ND1rWcvFsGjDT3X` - Shared account.

# 1.1 How to Create a script

The idea here is to create a script and attach it to the account so this account can :

1. Check if the transaction meets certain requirements which is defined in the script.
2. Validate the transaction.
3. Confirm the transaction and broadcast it to the blockchain network.

**Now let's Start our 2 of 2 MultiSig Example:**

1. Use our [IDE](https://ide.testnet-0bsnetwork.com) to write your script \(you can find some script examples there\)
2. For this example we will use the following script: In the first two lines, we defined 2 public keys encoded in base58 for both alice and bob. After that, users gather 2 public keys  in proofs\[0\] and proofs\[1\]. The account is funded by the team members and after that, when 2 of 3 team members decide to spend money, they provide their signatures in a single transaction. The Smart account script, using sigVerify function, validates these signatures with proofs and if 2 of 2 are valid then the transaction is valid too, else the transaction does not pass to the blockchain.

```
let alicePubKey  = base58'Ey6Z9XkWsvG8JZwyxhkTjydRcGp1wg6rbC3AYcxq7Efr'
let bobPubKey    = base58'5PvhyouzHn2Pcev56oBvwpnsGK5fEu1dA8fM2nJQM4HR'

let aliceSigned  = if(sigVerify(tx.bodyBytes, tx.proofs[0], alicePubKey)) then 1 else 0
let bobSigned    = if(sigVerify(tx.bodyBytes, tx.proofs[1], bobPubKey  )) then 1 else 0
aliceSigned + bobSigned == 2
```

1. Switch to the `BINARY` tab.

2. Click on `COPY TO CLIPBOARD` button. A compiled Base64-encoded script should be copied into your clipboard as shown below \(this step will be required later\).

```
5Xt9H8mHtikSytHF72xAU3NJwDydxXYMMhmWiNVLbYdBRQ3FHXksc8kW8tKFm3fGto1EwTt4YSybEUrpT2yB71hCvUS3WxWfsC4PxU7
oTGt687w8T195NVeMPUqdWeHT5BwVrsoFkXF5SuMEGTaB4RyP43ygfTCNNdWauiV7guKmSvH3V2dFpK1HvhVPBjG1QafJ63Awp5qLzQ
orFAbBVxgfqFLk6c99vrHCHpdjjiPv3vMN7FWLFrMPhGZbzBdyqQ8pCy1dkadxdkAytxZ3AUszTM2cfREgh9QjVVtcody7VsxDsbTPv
uETHgcrk96jY7Pzft2nE7W9VF3EcGXJ7VDSKX5ucVpkZwugJCa4SgAkBGPnCxmUf3RmrAUuWaCQPMPfUyayyWfZ4wDguz74cLuDpmU3
htVHbcuVQ7KrU55b5w4QFZyLDzHvgXXtCiqMEKFTrepcdy2LjA55D63EUhmQgVA6yqQbmLU6WKFabEsXETBRtzmCqPmGeB4iQXS16rB
WBMHK214mYRoxdAH3zvKyWQcqndnWETd59mCEGkRjB9UUL6vmCF1ZQCSytdJKgyRhRQ7pzxxa5iL92hGSCRdw7yFWAv77aCV3ujJjqs
SAtDTKwqmdqJpWtBWYLEy6cfaTTKCQFNH2Lnj2DYgaFRWETGQVQpMMVYFKkk
```

# 1.2 Attaching a script to account

1. Now let's prepare a JSON request to sign a SetScriptTransaction for the shared account with a given script:

   ```json
   {
    "type": 13,
    "version": 1,
    "sender": "3N7H4jTBMKtZfNCY86K2ND1rWcvFsGjDT3X",
    "fee": 1000000000,
    "script": "<script>`"
   }
   ```


2. Send it to [/transactions/sign]:

   ```bash
   $ curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' \
   --header 'X-API-Key: <it is a secret>' \
   -d '{ "type": 13, "version": 1, "sender": "3N7H4jTBMKtZfNCY86K2ND1rWcvFsGjDT3X", "fee": 100000, \
   "script": "<script>" }' 'https://nodeaddress/transactions/sign'
   ```

   and receive a JSON ready to broadcast:

   ```json
   {
    "type": 13,
    "id": "8w7yauNiENsJP8oDUpVEfiAzyEzMKoXbJEqS26Ht99mg",
    "sender": "3N7H4jTBMKtZfNCY86K2ND1rWcvFsGjDT3X",
    "senderPublicKey": "66xdGznqt2AVLMZRHme9vFPC6cvN4yV95wRWPfTus3Qe",
    "fee": 100000,
    "timestamp": 1525797758819,
    "proofs": [
      "4Ro4e4UrsVkaFbHtu96qZwHAdf8N4TtpjSGik9kRusmmYKCxicdsEqcgQrYden36nurqhY9EBkTKwD499kAi5rxe"
    ],
    "version": 1,
    "script": "<script>"
   }
   ```

3. Then we [broadcast] a prepared request:

   ```bash
   $ curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' \
   --header 'X-API-Key: <it is a secret>' \
   -d '{ "type": 13, "id": "8w7yauNiENsJP8oDUpVEfiAzyEzMKoXbJEqS26Ht99mg", "sender": "3N7H4jTBMKtZfNCY86K2ND1rWcvFsGjDT3X", \
    "senderPublicKey": "66xdGznqt2AVLMZRHme9vFPC6cvN4yV95wRWPfTus3Qe", "fee": 100000, "timestamp": 1525797758819, \
    "proofs": [ "4Ro4e4UrsVkaFbHtu96qZwHAdf8N4TtpjSGik9kRusmmYKCxicdsEqcgQrYden36nurqhY9EBkTKwD499kAi5rxe" ], \
    "version": 1, "script": "<script>" }' \
   'https://example.org/transactions/broadcast'
   ```

4. And check it was applied:

   ```bash
   $ curl http://example.org/addresses/scriptInfo/3N7H4jTBMKtZfNCY86K2ND1rWcvFsGjDT3X
   {
    "address" : "3N7H4jTBMKtZfNCY86K2ND1rWcvFsGjDT3X",
    "script" : "<script>",
    "scriptText" : "<scriptText>",
    "complexity" : 27,
    "extraFee" : 400000
   }
   ```

where `<scriptText>` is a String representation of compiled `<script>` \(expression tree\)

Fine! Now we able to make transfers from this account.
