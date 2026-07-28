import { beforeEach, describe, expect, it, vi } from "vitest";
import { useSimpleWrite } from "../use-simple-write";

const mockWriteContractAsync = vi.fn();
const mockSimulateContract = vi.fn();

type Hex = `0x${string}`;

let publicClient: { simulateContract: typeof mockSimulateContract } | undefined;

let address: Hex | undefined;

vi.mock("wagmi", () => {
  return {
    useAccount: () => ({
      get address() {
        return address;
      },
    }),
    usePublicClient: () => publicClient,
    useWriteContract: () => ({
      writeContractAsync: mockWriteContractAsync,
    }),
  };
});

describe("simpleWrite", () => {
  beforeEach(() => {
    publicClient = {
      simulateContract: mockSimulateContract,
    };
    address = "0xabc";
  });

  const defaultSimpleWriteInput = {
    abi: [
      {
        type: "function",
        name: "fake",
        stateMutability: "nonpayable",
        inputs: [],
        outputs: [],
      },
    ],
    address: "0xcontract" as Hex,
    functionName: "fake",
    args: [],
  } as const;

  const simpleWriteInput = <T extends Partial<typeof defaultSimpleWriteInput>>(
    overrides?: T,
  ) => ({ ...defaultSimpleWriteInput, ...overrides });

  it.each([
    ["publicClient", publicClient],
    ["address", address],
  ])("returns undefined when no %i", async (_, prerequisite) => {
    const { simpleWrite } = useSimpleWrite();
    prerequisite = undefined;

    await expect(simpleWrite(simpleWriteInput())).resolves.toBeUndefined();
    expect(mockWriteContractAsync).not.toHaveBeenCalled();
  });
});
