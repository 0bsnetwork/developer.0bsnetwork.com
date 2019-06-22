# Introduction

This section will explain all the parts of our platform from a developers point of view. To check the status of any of our central services you can visit [https://status.0bsnetwork.com/](https://status.0bsnetwork.com/) And you can also run any of these services yourself.

## Key Players

### Full Node

This is the 'core' of our platform. Each node processes transactions into blocks. A node contains a wallet. A collection of nodes create ...

### The Network

We have 2 networks, MainNet and TestNet. Testnet is where all development can take place as the coins are worthless, and you can afford to make mistakes. You can think of MainNet as 'Production'. For MainNet you can replace testnet- in all the URLs in this documentation.

### Full Node API

Our full node exposes an API for;
 - Transactions (Creating and Broadcasting)
 - Node, Network and Address information
 - Node operation and configuration

However, in some cases, to get aggregate data such as data from data transactions, you are better using the data service API listed below.

### Client / Wallet

A hosted version of a wallet for those that do not run a full node, it connects to our full node to get its information by default but you can also point it at your own node. Here you can view your balances, create tokens, Send and receive, Trade and view blockchain info

[https://client.testnet-0bsnetwork.com](https://client.testnet-0bsnetwork.com)

### Faucet

A 'Faucet' allows you to obtain free testnet coins in order to build your project. You can go to [https://explorer.0bsnetwork.com/testnet/faucet](https://explorer.0bsnetwork.com/testnet/faucet) and simply enter your address to obtain 250 free testnet coins

### Block Explorer

Our block explorer lists all the blocks within our network, you can drill down to transaction level and see all the details. This is useful to look into transactions as you are developing to check you get the expected result.

[https://explorer.0bsnetwork.com (Select testnet from dropdown)](https://explorer.0bsnetwork.com)

### IDE / Smart Contracts

Our smart contracts are written in a language called RIDE and can be applied to either an Asset to create a 'Smart Asset' or an account (Address) to create a 'Smart Account' This enables us to create behaviours on a token (Trading restraints for example) or an account (Multi Signature)

You can have a play and use our REPL at the below link. There's also some sample scripts and you can deploy right from the IDE page.

[https://ide.0bsnetwork.com](https://ide.0bsnetwork.com)

### Data Service

This is a nice fast rest API that exposes information from our blockchain such as;

- Data from data transactions (Ability to query and filter)
- Information about Assets
- Trading Information (Stats, Prices, Volume)

See the [Data Service API](dataservice.md) Section for details

### Matcher

The matcher is our trading 'engine' taking orders for sells and buys and matching them up, the matcher hosts the orderbook and also has an API

[https://matcher.testnet-0bsnetwork.com](https://matcher.testnet-0bsnetwork.com)

### Libraries

We have a library for many differnet languages and platforms and more are being added every day. The libraries are firstly an interface to the Node and Matcher API, with the addition of the ability to sign transactions and broadcast them to the node (Signing transactions manually is a little tricky)

### 0bsLink

0bsLink is a browser add-on / extension that is essentially a wallet, however it comes with an API so you can build a wabpage to interact with this extension, to build 0bsNetwork powered web applicaitons witout having to deal with any of the complexity.

### IDE & REPL

This is where you can code and test smart contracts, as well as use our REPL.. This tool comes with plenty of examples and help, so dive right in and check it out. Always worth having this open in a tab during development!

[https://ide.testnet-0bsnetwork.com](https://ide.testnet-0bsnetwork.com)

