import { Abi, BaseError, ContractFunctionName, Hex } from "viem";
import { useAccount, usePublicClient, useWriteContract } from "wagmi";

import { WriteAction } from "@a2zb/viem";

type PayableStatus = "payable" | "nonpayable";

export function useSimpleWrite() {
  const account = useAccount();
  const publicClient = usePublicClient();

  const { writeContractAsync } = useWriteContract();

  async function simpleWrite<
    const TAbi extends Abi,
    TFuncName extends ContractFunctionName<TAbi, PayableStatus>,
  >({
    abi,
    address,
    functionName,
    args,
    value,
    onSuccess,
    onError,
  }: WriteAction<TAbi, TFuncName> & {
    onSuccess?: (hash: Hex) => void;
    onError?: (err: Error) => void;
  }) {
    if (!account.address || !publicClient) return;

    try {
      const { request } = await publicClient.simulateContract({
        address,
        abi,
        functionName,
        args,
        value,
        account: account.address,
      });

      await writeContractAsync(
        request as Parameters<typeof writeContractAsync>[0],
        {
          onSuccess,
          onError,
        },
      );
    } catch (err) {
      const message =
        err instanceof BaseError
          ? err.shortMessage
          : err instanceof Error
            ? err.message
            : String(err);
      onError?.(new Error(message));
    }
  }

  return { simpleWrite };
}
