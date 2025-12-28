#!/usr/bin/env bash
set -euo pipefail

# Lumen Trace — Contract Deployment Script (Foundry)
# Deploys a single contract (default: BlockCounter) to Base Sepolia or Base Mainnet.
#
# Required env vars:
#   PRIVATE_KEY=0x...
#   NETWORK=base-sepolia|base-mainnet
#
# Optional:
#   CONTRACT=src/BlockCounter.sol:BlockCounter

if [ -z "${PRIVATE_KEY:-}" ]; then
  echo "❌ PRIVATE_KEY not set"
  exit 1
fi

if [ -z "${NETWORK:-}" ]; then
  echo "❌ NETWORK not set (base-sepolia | base-mainnet)"
  exit 1
fi

case "$NETWORK" in
  base-sepolia)
    RPC_URL="https://sepolia.base.org"
    CHAIN_ID="84532"
    ;;
  base-mainnet)
    RPC_URL="https://mainnet.base.org"
    CHAIN_ID="8453"
    ;;
  *)
    echo "❌ Unknown NETWORK: $NETWORK"
    exit 1
    ;;
esac

CONTRACT="${CONTRACT:-src/BlockCounter.sol:BlockCounter}"

echo "🚀 Deploying contract"
echo "   Network : $NETWORK"
echo "   ChainId  : $CHAIN_ID"
echo "   RPC      : $RPC_URL"
echo "   Contract : $CONTRACT"

forge create \
  --rpc-url "$RPC_URL" \
  --private-key "$PRIVATE_KEY" \
  --chain-id "$CHAIN_ID" \
  "$CONTRACT"

echo "✅ Deployment finished"
