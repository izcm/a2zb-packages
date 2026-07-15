import { Address } from 'viem'

export type ChainConfig = {
  chainId: number
  rpcUrl: string
  marketplaceAddr: Address
  wethAddr: Address
}
