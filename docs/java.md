## ZbsJava

# zbsjava
A Java library for interacting with the zbsnetwork blockchain.

Supports node interaction, offline transaction signing, Matcher orders, and creating addresses and keys.

## Using zbsjava in your project

Use the library from GitHub: https://github.com/0bsnetwork/zbsjava

Or Use the [JAR file here](resources/zbsjava.zip)

Either build the JAR with SBT or Import the files into your project structure (Expecially with android, as you will need to manage some dependancy differences)

## Basic Usage
Create an account from a private key:
```
String seed = "health lazy lens fix dwarf salad breeze myself silly december endless rent faculty report beyond";
PrivateKeyAccount account = PrivateKeyAccount.fromSeed(seed, 0, Account.MAINNET);
byte[] publicKey = account.getPublicKey();
String address = account.getAddress();
```

Data Transaction:

```
String seed = "health lazy lens fix dwarf salad breeze myself silly december endless rent faculty report beyond";
        PrivateKeyAccount account = PrivateKeyAccount.fromSeed(seed, 0, Account.MAINNET);

        List<DataEntry<?>> data = new LinkedList<DataEntry<?>>();
        data.add(new DataEntry.StringEntry("Tree ID", "Tree Data"));

        Node node = null;
        try {
            node = new Node("https://nodes.testnet-0bsnetwork.com/", "T".charAt(0));
            String txId = node.data(account, data,300_000 );

        } catch (URISyntaxException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
```

Create a Node and learn a few things about blockchain:
```
Node node = new Node("https://nodes.testnet-0bsnetwork.com/", Account.TESTNET);
System.out.println("Current height is " + node.getHeight());
System.out.println("My balance is " + node.getBalance(address));
System.out.println("With 100 confirmations: " + node.getBalance(address, 100));
```

Send some money to a buddy:
```
String buddy = "3N9gDFq8tKFhBDBTQxR3zqvtpXjw5wW3syA";
String txId = node.transfer(account, buddy, 1_00000000, 100_000, "Here's for you");
```

Set a script on an account. Be careful with the script you pass here, as it may lock the account forever!
```
String setScriptTxId = node.setScript(alice, "tx.type == 13 && height > " + height, Account.MAINNET, SCRIPT_FEE);
```

Sign a transaction offline:
```
Transaction tx = Transaction.makeTransferTx(account, buddy, 1_00000000, Asset.ZBS, 100_000, Asset.ZBS, "");
System.out.println("JSON encoded data: " + tx.getJson());
System.out.println("Server endpoint to send this JSON to: " + tx.getEndpoint());
```

Now send it from an online machine:
```
node.send(tx);
```

Create a DEX order:
```
Node matcher = new Node("https://nodes.testnet-0bsnetwork.com", Account.MAINNNET);
String matcherKey = matcher.getMatcherKey();
String zbtcId = "Fmg13HEHJHuZYbtJq8Da8wifJENq8uBxDuWoP9pVe2Qe";
Order order = matcher.createOrder(alice, matcherKey,
                new AssetPair(Asset.ZBS, zbtcId),
                // buy 10 ZBS at 0.00090000 ZBTC each
                Order.Type.BUY, 90_000, 10 * Asset.TOKEN,
                // make order valid for 1 hour
                System.currentTimeMillis() + 3_600_000, MATCHER_FEE);
System.out.printf("Filed order " + order.id);
```
There are some examples under `src/examples/java`.

## Building the library

To build from scratch, run

```
mvn clean package
```

The outputs are placed under the `target` directory.
