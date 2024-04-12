import { useEffect, useState } from "react";
import { type Chain, isChain } from "./config";
import { usePublicClient } from "wagmi";

export function useChain() {
  const client = usePublicClient();
  // avalanche fuji is the default chain
  const [chain, setChain] = useState<Chain>("Avalanche Fuji");

  useEffect(() => {
    if (typeof window === 'undefined' || !client) {
      return;
    }

    const chainName = client.chain.name as Chain;

    if (!isChain(chainName)) {
      console.warn(`Invalid chain name "${chainName}"`)
      return;
    }

    setChain(chainName);
  }, [client])

  return chain;
}