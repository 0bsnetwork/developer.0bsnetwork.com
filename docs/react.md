
# zbs-react

A React Native library for interacting with 0bsNetwork. Currently, the functions implemented allow you to do the following;

- Generate Addres - This creates a new wallet for your user, and returns an Address, and a Seed Phrase. You should store the seed phrase in your app (Encrypted, for production), so you can use it for future transactions. The address is the bit you give to the user!

- SaveData - This creates a transaction that saves data to the blockchain. You can use this to save a json object to the blockchain. In return, you get a transaction ID that you can use to see the data once its on the blockchain at https://explorer.0bsnetwork.com by searching the transaction ID. You can also use that URL as a permalink, take a look at the URL format, should you need to link to this from your app to prove the data is saved.

- sendTokens - This method allows you to transfer ZBS coin, or another token (Given an assetId) to another address, given a seed (Thus a private key).

- generateDocumentHash - This creates a document hash for a file uploaded, however its currently only implemented in Android, and is experimental.

## Getting started

`$ npm install 0bsnetwork/zbs-react --save`

### Mostly automatic installation

`$ react-native link 0bsnetwork/zbs-react`

### For Android, Add below code in your app gradle file

```

android {
	defaultConfig {
		multiDexEnabled true
	}
}

```

	IMPORTANT: when using `generateDocumentHash` function it's necessary to pass absolute file path and request permissions (on Android) to read on the external storage, here an example: [React Native Offical Doc] (https://facebook.github.io/react-native/docs/permissionsandroid)

## Usage

### GenerateAddress

```
import RN0bsnetwork from "zbs-react";

const response = await RN0bsnetwork.generateAddress();
      var responseData = JSON.parse(response);
      this.setState({ seed: responseData.seed, address: responseData.address });


```


### saveData

```
import RN0bsnetwork from "zbs-react";

let dataArray = [
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
      }
]

let transfer = {data: dataArray, SEED_DATA: 'my long seed phrase ', NODE_URL: 'https://node1.testnet-0bsnetwork.com', assetId: '47dNzPs4KPFZchaahiDCLwsPSMsPDgy9CXfnutieHxMc'}

const transactionLog = await RN0bsnetwork.makeTransfer(transfer);

console.log(transactionLog);


```


### sendTokens

```
import RN0bsnetwork from "zbs-react";

let transfer = {amount: 50, recipient:'3NBvF4xAGXJyrJNyS8B1yjrpBRdyT53MD6L', SEED_DATA: 'my long seed phrase ', NODE_URL: 'https://node1.testnet-0bsnetwork.com', assetId: '47dNzPs4KPFZchaahiDCLwsPSMsPDgy9CXfnutieHxMc'}

// Note: Exclude assetId to send ZBS.

const transactionLog = await RN0bsnetwork.makeTransfer(transfer);

console.log(transactionLog);

```

For all issues, questions or suggestions, raise an issue or message @justJamesDev on Telegram or raise a PR, All contributions welcome!

