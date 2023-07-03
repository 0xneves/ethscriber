# Thescriptions

Welcome to Thescriptions, where description becomes history.

Global Contract deployed at: `0xD15EBb0658DC90D30A4256Da8A891B6A89f7cc4D`
Chains: Ethereum, Avalanche, Binance, Polygon, Fantom.

## How to Ethscribe and comprehend its mechanics:

- Send a transaction to this contract as if it were an EOA;
- The `msg.data` will be the content of the Ethscription;
- The `msg.sender` will be the creator of the Ethscription;
- The `txHash` will be the Ethscription ID;
- Any `msg.value` will be refunded
- Any `msg.data` will be logged as its hash

## How to use Ethscriber in your project:

- Import the Ethscriber address as a constant;
- Use `delegatecall()` to preserve the `msg.sender` when calling the contract;
- The `msg.data` will be the content of the Ethscription;

## How to index Ethscriptions:

- Listen to this contract events;
- Display the indexation that better fits your client base;

## Setup and usage

### Instalation

```
yarn
```

### Testing

```
npx hardhat test
```

### Deploying

Change the network name where its specified by one of the options in the `hardhat.config.ts` file.

```
npx hardhat run scripts/deploy.ts --network <NETWORK_NAME>
```

### Ethscribe

Change the network name where its specified by one of the options in the `hardhat.config.ts` file.

```
npx hardhat run scripts/ethscribe.ts --network <NETWORK_NAME>
```
