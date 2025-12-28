# Lumen Trace (Built for Base)

Lumen Trace is a simple, read-only inspection tool for the Base ecosystem. It is designed to help developers quickly check network setup, inspect basic onchain data, and validate testnet deployments without sending transactions or changing blockchain state.

---

## What This Project Is For

Lumen Trace is useful when you need to:
- Confirm you are connected to Base Sepolia  
- Verify the active chainId (84532)  
- Check wallet balances and transaction counts  
- See whether an address is a contract or an EOA  
- Review recent block and gas information  
- Open verified links on Basescan  

All actions are safe and read-only.

---

## Supported Network

Base Sepolia  
chainId (decimal): 84532  
Explorer: https://sepolia.basescan.org  

---

## Repository Overview

- **app/lumen-trace.ts**  
  Main script that connects to Coinbase Wallet and reads data from Base Sepolia.

- **contracts/**  
  Solidity contracts deployed on Base Sepolia for testnet validation:
  - `ERC721.sol`  

- **scripts/sample-addresses.json**  
  Example addresses used during testing.

- **scripts/deploy-contracts.sh**  
  Helper script for contract deployment.

- **logs/snapshot.log**  
  Example output from network snapshots.

- **package.json**  
  Dependency list including Base and Coinbase repositories.

- **README.md**  
  Project documentation.

---

## How It Works

Lumen Trace connects to Coinbase Wallet using the Coinbase Wallet SDK and queries Base Sepolia through viem. It reads public blockchain data such as balances, blocks, and transaction counts, and provides direct explorer links for easy verification.

No transactions are signed or broadcast.

---

## Testnet Deployment (Base Sepolia)

The following contracts were deployed to Base Sepolia for basic validation.

Network: Base Sepolia  
chainId (decimal): 84532  
Explorer: https://sepolia.basescan.org  

Contract ERC721.sol address:  
0x9F694F8318A981bd584692bBF7458c0c4eCD8CeD

Deployment and verification:
- https://sepolia.basescan.org/address/0x9F694F8318A981bd584692bBF7458c0c4eCD8CeD
- https://sepolia.basescan.org/0x9F694F8318A981bd584692bBF7458c0c4eCD8CeD/0#code
  
---

## Tools Used

- Coinbase Wallet SDK  
- viem  
- Base GitHub repositories  
- Coinbase GitHub repositories  

---

## License

MIT License  
Copyright (c) 2025 YOUR_NAME

---

## My socials

GitHub: https://github.com/fathom-owl

Email: fathom_owl_0d@icloud.com

Twitter: https://x.com/gavinralis1
