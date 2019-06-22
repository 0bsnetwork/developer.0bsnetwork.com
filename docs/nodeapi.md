## Full Node API

The full node exposes an API that allows you to manage the node, get information about its status, get information about the blockchain, and interact with the blockchain.

The node comes with its own API documentation which goes some way to explain the features and functions and that can be found on port 7431 on your own node, or you can use our public node API here;

[https://node1.testnet-0bsnetwork.com](https://node1.testnet-0bsnetwork.com)

To enable the API on your own node, you need to enable it, set its API key, and ensure its listening and exposed on the firewall. Within your nodes configuration file, find the rest-api section and set;

- enable = yes
- bind-address = Your IP or 0.0.0.0 to listen on all IPs
- double check the port its 7431 for testnet and 7441 for mainnet and open up that port on your firewall (ufw allow 7431)
- Initially set api-key-hash to some gibberish to protect your API, and we can set it properly in the next step.

```
 rest-api {
    enable = yes
    bind-address = "127.0.0.1"
    port = 7431
    api-key-hash = "86GJVSoboK12zXHYJFzoucAKaFS1yyXA2NztWSt9tGiX"
  }

```

Once you restart your node, you should be able to access the swagger interface at http://yournode:7431

Now we need to setup the API key, and the API conveniently has a feature to do that, open up the 'utils' section on the API page, and find;

```utils/hash/secure```

Enter your desired API key and hit 'try it out' and it should give you a hash in response. Paste that into the api-key-hash in your config file and restart your node again, you can now use the API key in API calls that require it.

This API key gives you access to features on your node using the nodes wallet, for example, you can have the node sign a transaction

### Signing Transactions on the Node

You can send a transaction to your node to sign, and it will be signed using the private key of the nodes wallet (Ensure the nodes wallet has funds... You can get its address from the nodes API /addresses endpoint) The steps to do this are as below.

> Note: Its not possible to sign transactions on our public nodes as the node does these oprations using its own private key

- Obtain the correct JSON transaction format from [Transactions](transactions.md)
- POST the json to the ```/transactions/sign``` endpoint (Including your API key in the header X-API-Key)
- The node returns a signed transaction
- POST the signed transaction to the nodes ```/transactions/broadcast``` endpoint

Below is an example of the ```transactions/sign``` endpoint

```
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' --header 'X-API-Key: myapikey' -d '{ \
     "senderPublicKey":"4c5K4kGeRdrnSYZ9wngQKSozikVgfxmDEuViirsyUHwd", \
     "amount":110000000 \
     fee":500000, \
     "type":4, \
     "version":2, \
     "attachment":"", \
     "sender":"3MyT3r1S8xvKtiKnLgVNNiSAiQdnMbffBQy", \
     "feeAssetId":null, \
     "proofs":["2KFbYWi9BJwDG9dbiJQzC9qJPpu4Ug8Ybs331fQbX9FAkEpEtrj9DKvwNG7cb2m98DV6NCoKH4MBVtGGFsnQWPV6"], \
     "assetId":null, // If we are sending an asset, null for ZBS \
     "recipient":"3MqEisFsWdhvDMAKBwZzZv4niVsfJJtxcaw", \
     "feeAsset":null \
 }' 'https://node1.testnet-0bsnetwork.com/transactions/sign'
```

Of course this is not ideal for many situations, and you need to sign the transaction on the client side, and only use the node to broadcast the transaction. Our libraries help with this, or check out [Transactions](transactions.md) For more details on manually signing transactions.

### Matcher API

Matcher also has an API to create orders, and get orderbook information. The documentation for this is hosted by the matcher at;

[https://matcher.testnet-0bsnetwork.com](https://matcher.testnet-0bsnetwork.com)