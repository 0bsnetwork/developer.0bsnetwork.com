# Signer API

This enables you to sign and broadcast a transaction only having the key and transaction data.

> Note: This is just for POC's and shouldn't be used on a production environment

## Usage

### Data Transaction

```
POST https://signer.testnet-0bsnetwork.com/data

Accept: application/json
Content-Type: application/json

{
	"seed": "seed phrase here",
	"data": [
    { "key": "integerVal", "value": 1 },
    { "key": "booleanVal", "value": true },
    { "key": "stringVal", "value": "hello" },
    { "key": "binaryVal", "value": [1, 2, 3, 4] }
  ]
}

RESPONSE:

{
    "type": 12,
    "version": 1,
    "senderPublicKey": "3np4zRL2mjYSFcpTzbGtQzUePAEByxEADgQCPJB7Dguq",
    "fee": 3000000,
    "timestamp": 1574975434582,
    "proofs": [
        "3tXuGRUGbV7xVWTGN79cRtkyrq4XWoN6wGH9KFiFn14P4EJR51LDenfvrP34YUZnXvAg4i7iUa728h1LdVVsjSdd"
    ],
    "id": "EDoej1N3zEWXs9XGNwBjJHPyQECA577dQfBe2LN5Pvh2",
    "data": [
        {
            "type": "integer",
            "key": "integerVal",
            "value": 1
        },
        {
            "type": "boolean",
            "key": "booleanVal",
            "value": true
        },
        {
            "type": "string",
            "key": "stringVal",
            "value": "hello"
        },
        {
            "type": "binary",
            "key": "binaryVal",
            "value": "base64:AQIDBA=="
        }
    ]
}


```


