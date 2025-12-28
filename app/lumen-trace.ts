// app/lumen-trace.ts
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import {
  createPublicClient,
  http,
  formatEther,
  isAddress,
  getAddress,
} from "viem";
import { baseSepolia } from "viem/chains";

const RPC_URL = "https://sepolia.base.org";
const CHAIN_ID = 84532;
const EXPLORER = "https://sepolia.basescan.org";

const sdk = new CoinbaseWalletSDK({
  appName: "Lumen Trace (Built for Base)",
  appLogoUrl: "https://base.org/favicon.ico",
});

const client = createPublicClient({
  chain: baseSepolia,
  transport: http(RPC_URL),
});

type AddressReport = {
  address: string;
  balance: bigint;
  nonce: number;
  isContract: boolean;
};

async function connectWallet() {
  const provider = sdk.makeWeb3Provider(RPC_URL, CHAIN_ID);
  const accounts = (await provider.request({
    method: "eth_requestAccounts",
  })) as string[];

  const address = getAddress(accounts[0]);
  const balance = await client.getBalance({ address });

  return { address, balance };
}

async function inspectAddress(input: string): Promise<AddressReport> {
  if (!isAddress(input)) {
    throw new Error("Invalid address");
  }

  const address = getAddress(input);
  const [balance, nonce, code] = await Promise.all([
    client.getBalance({ address }),
    client.getTransactionCount({ address }),
    client.getBytecode({ address }),
  ]);

  return {
    address,
    balance,
    nonce,
    isContract: !!code,
  };
}

async function networkSnapshot() {
  const block = await client.getBlock();
  const gasPrice = await client.getGasPrice();

  return {
    blockNumber: block.number,
    timestamp: block.timestamp,
    gasUsed: block.gasUsed,
    gasLimit: block.gasLimit,
    gasPrice,
  };
}

async function run() {
  const wallet = await connectWallet();
  const snapshot = await networkSnapshot();

  console.log("Network: Base Sepolia");
  console.log("chainId:", CHAIN_ID);
  console.log("Wallet:", wallet.address);
  console.log("Balance:", formatEther(wallet.balance), "ETH");
  console.log("Latest block:", snapshot.blockNumber);
  console.log("Gas price:", snapshot.gasPrice.toString());
  console.log("Explorer:", `${EXPLORER}/address/${wallet.address}`);
}

run().catch((err) => {
  console.error("Error:", err.message);
});
