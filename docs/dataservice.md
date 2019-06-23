## Data Service API

Our data service API stores information about the blockchain, data, and trading. We host a public version of the API, and if you need more limits (Public API limits number of results in 1 page) you can also run your own dockerised version of this API.

You can use this API to, for example, get a list of all data submitted on an account within 24 hours. It's much quicker and easier than using the Node API where you would have to pull a list of all blocks and transactions and locate the right data.

The documentation for the API is located at;

[https://api.testnet-0bsnetwork.com/docs](https://api.testnet-0bsnetwork.com/docs)

Below is a demonstration of using the API

### Demo

Here's a quick demo of our data API. This is a small docker container that runs alongside a node (NodeJS + PostGreSQL) and either you could run your own if your data querying requirements are large, or use our public one for smaller queries (There's smaller limits in place on the public one)

So, Lets say we want to get all data transactions for a particular ID, in this case, I've been saving data from my orange tree, which has a 'plantId' of '23456-f344f3'

So the filters we have available on the data transaction endpoint are as follows

- ```sender``` - public address of the data transaction sender
- ```timeStart``` - Start Time (e.g. 2019-05-29T03:51:05.303Z) or just date
- ```timeEnd``` - End Time (As Above)
- ```key``` - Filter by Key
- ```type``` - Filter by data type
- ```value``` - Filer by value
- ```after``` - Insert the previous pages cursor (lastCursor) to get the next set of records (depending on limit)
- ```limit``` - How many to return (Default 100 Max 1000)

So, if we want to get all data transactions on the 27th May for my plant, we can query like this (Lets say we want them in pages of 5) .. Go ahead and click the URL to try it!

[https://api.testnet-0bsnetwork.com/v0/transactions/data?key=plantid&type=string&value=23456-f344f3&timeStart=2019-05-27&limit=5](https://api.testnet-0bsnetwork.com/v0/transactions/data?key=plantid&type=string&value=23456-f344f3&timeStart=2019-05-27&limit=5)

We can see we get 5 results, and only data for that plant based on its plantId, we can see the Temp, Humidity and Soil Moisture. If we now want to get the next 5 records, we take the 'lastCursor' value of the response, and use it for the 'after' paramter in the next call

[https://api.testnet-0bsnetwork.com/v0/transactions/data?key=plantid&type=string&value=23456-f344f3&timeStart=2019-05-27&limit=5&after=MjAxOS0wNS0yOVQwNDo1MTowNS42NzJaOjoyZnA2OUJEVjJ3M0tjZ1h0eWozdGJrSER1b3g0NnNtdDFUOUNKcWh3NGtDajo6ZGVzYw==](https://api.testnet-0bsnetwork.com/v0/transactions/data?key=plantid&type=string&value=23456-f344f3&timeStart=2019-05-27&limit=5&after=MjAxOS0wNS0yOVQwNDo1MTowNS42NzJaOjoyZnA2OUJEVjJ3M0tjZ1h0eWozdGJrSER1b3g0NnNtdDFUOUNKcWh3NGtDajo6ZGVzYw==)

This now gives us the next 5 records.. we could continue this until we react the end of the data (response.data.count < 5)

Note: For UI apps its best to only request what the user is viewing on the screen and make subsequent calls to update, most grids support this style of paging. For back end, you can request in chunks of 1000, or run your own data service to increase this limit.

Finally, all data is always returned with its transactionID, so any transaction can be verififed on the blockchain using any or your own node!