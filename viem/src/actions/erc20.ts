import { erc20Abi } from 'viem'
import { makeContractReader } from './contract-reader.js'

export const readERC20Contract: ReturnType<typeof makeContractReader<typeof erc20Abi>> =
  makeContractReader(erc20Abi)
