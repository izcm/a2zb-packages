import { Abi, Address, ContractFunctionArgs, ContractFunctionName, Hex } from 'viem'
import { useAccount, useChainId, useConfig, useWriteContract } from 'wagmi'
import { getPublicClient } from 'wagmi/actions'

type PayableStatus = 'payable' | 'nonpayable'

export type WriteAction<
  TAbi extends Abi = Abi,
  TFuncName extends ContractFunctionName<TAbi, PayableStatus> = ContractFunctionName<
    TAbi,
    PayableStatus
  >,
> = {
  abi: TAbi
  address: Address
  functionName: TFuncName
  args: ContractFunctionArgs<TAbi, PayableStatus, TFuncName>
}

export function useSimpleWrite() {
  const account = useAccount()
  const chainId = useChainId()
  const config = useConfig()

  const { writeContractAsync } = useWriteContract()

  async function simpleWrite<
    const TAbi extends Abi,
    TFuncName extends ContractFunctionName<TAbi, PayableStatus>,
  >({
    abi,
    address,
    functionName,
    args,
    onSuccess,
    onError,
  }: WriteAction<TAbi, TFuncName> & {
    onSuccess: (hash: Hex) => void
    onError: (err: Error) => void
  }) {
    if (!account.address) return

    const publicClient = getPublicClient(config, { chainId })
    if (!publicClient) throw new Error(`no public client for chain ${chainId}`)

    try {
      const { request } = await publicClient.simulateContract({
        address,
        abi,
        functionName,
        args,
        account: account.address,
      })

      await writeContractAsync(request as Parameters<typeof writeContractAsync>[0], {
        onSuccess,
        onError,
      })
    } catch (err) {
      onError(err instanceof Error ? err : new Error(String(err)))
    }
  }

  return { simpleWrite }
}
