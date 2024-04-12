import { DEPLOYMENT } from "./config";
import { useChain } from "./useChain";

export function useAddresses() {
  const chain = useChain();

  return {
    schemaRegistryAddress: DEPLOYMENT[chain].schemaRegistry.address,
    easAddress: DEPLOYMENT[chain].eas.address,
  }
}