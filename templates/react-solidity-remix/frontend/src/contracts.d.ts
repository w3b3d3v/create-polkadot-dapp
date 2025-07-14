// This file is needed only for type check
// the actual contents are created with `npm run build`
import { type Interface } from "ethers";

export type ContractData = {
  name: string;
  address: string;
  abi: Interface;
};

export const contracts: Record<string, ContractData> = {}
