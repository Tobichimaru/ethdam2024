
import { Chain as ViemChain, baseSepolia } from 'viem/chains';
import { http } from 'viem';
import { Abi } from 'abitype';

import baseSepoliaSchemaRegistry from '@ethereum-attestation-service/eas-contracts/deployments/base-sepolia/SchemaRegistry.json'
import baseSepoliaEAS from '@ethereum-attestation-service/eas-contracts/deployments/base-sepolia/EAS.json'


type Hash = `0x${string}`

export const DEPLOYMENT = {
    [baseSepolia.name]: {
      chain: baseSepolia,
      schemaRegistry: {
        address: baseSepoliaSchemaRegistry.address as Hash,
        abi: baseSepoliaSchemaRegistry.abi as Abi
      },
      eas: {
        address: baseSepoliaEAS.address as Hash,
        abi: baseSepoliaEAS.abi as Abi
      },
      blockBatchSize: 2048n,
      delayBetweenRPCRequests: 0,
      transportFactory: () => http()
    },
}

export type Chain = keyof typeof DEPLOYMENT;

export function isChain(key: any): key is Chain {
  return key in DEPLOYMENT;
}
