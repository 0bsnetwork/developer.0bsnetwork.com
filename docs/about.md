# About 0bsNetwork

0bsNetwork is a LPOS - Leasing Proof of Stake BlockChain, this differs from something like Bitcoin or Ethereum, as rather than having miners producing proof of work, for example, generating hashes to solve a challenge, a stake of coins instead secures the network. In our case, the coin is ZBS coin.

Running a full node on the network requires that the node has a 'generating balance' of at least 1000 ZBS coins, these can either be in the nodes wallet, or leased to the node. Once your node has established 1000 ZBS generating balance it will begin generating blocks. The more coins you have, the more often you will generate a block. Nodes that generate blocks recieve the transaction fees as the reward (As opposed to the block reward in bitcoin) Our network is entirely pre-mined, in a good way, we have 51m coins issued in the genesis block, so the supply will never change.

You can create a token on our platform right from the wallet (Or using a library or API if you wish) and set its supply, details etc. These are also refferred to 'assets' within the code and transactions.

We have 2 networks, one for developing on called testnet, and one 'live' network called mainnet. All the documentation refers to testnet and your app can be changed to mainnet later.

Our block time is 1 minute, and as soon as a transaction is broadcast to the network its added to a block by the current mining node. Once the block has been finalised and propogated to the network, this is considered as a confirmation. However, acceptance into a block means that the transaction is valid and WILL be included in the block.


Without further ado, lets move onto getting started where we explain all the parts of the system, and what you need to get up and running