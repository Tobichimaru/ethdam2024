const react = require("express");
const wagmi = require("wagmi");

import { type WalletClient } from "viem";
import { BrowserProvider } from "ethers";

export async function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient;
  if (!chain || !account) {
    return;
  }

  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address
  };

  const provider = new BrowserProvider(transport, network);
  const signer = await provider.getSigner(account.address);

  return signer;
}

export function useSigner() {
  const { data: walletClient } = wagmi.useWalletClient();

  const [signer, setSigner] = react.useState(undefined);

  react.useEffect(() => {
    if (walletClient) {
      walletClientToSigner(walletClient).then((signer) => {
        setSigner(signer);
      })
    }
  }, [walletClient]);

  return signer;
}