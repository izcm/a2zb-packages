import { beforeEach, describe, expect, it, vi } from "vitest";
import { useSimpleWrite } from "../use-simple-write";
import { BaseError } from "viem";

const mockWriteContractAsync = vi.fn();
const mockSimulateContract = vi.fn().mockReturnValue({ request: {} });

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

  const getWrite = (overrides?: {
    onSuccess?: (hash: Hex) => void;
    onError?: (err: Error) => void;
  }) => {
    const { simpleWrite } = useSimpleWrite();
    return () => simpleWrite({ ...simpleWriteInput(), ...overrides });
  };

  const simpleWriteInput = () => defaultSimpleWriteInput;

  it.each([
    ["publicClient", () => (publicClient = undefined)],
    ["address", () => (address = undefined)],
  ])("returns undefined when no %s", async (_, remove) => {
    remove();

    const { simpleWrite } = useSimpleWrite();

    await expect(simpleWrite(simpleWriteInput())).resolves.toBeUndefined();
    expect(mockSimulateContract).not.toHaveBeenCalled();
    expect(mockWriteContractAsync).not.toHaveBeenCalled();
  });

  describe("when simulation fails", () => {
    const onError = vi.fn();

    beforeEach(async () => {
      mockSimulateContract.mockRejectedValueOnce(new Error("boom"));
      const write = getWrite({ onError });
      await expect(write()).resolves.toBeUndefined();
    });

    it("does not send transaction", () => {
      expect(mockWriteContractAsync).not.toHaveBeenCalled();
    });

    it("calls onError", () => {
      expect(onError).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("when the contract-write fails", () => {
    const onError = vi.fn();

    beforeEach(async () => {
      mockWriteContractAsync.mockRejectedValueOnce(new Error("boom"));
      const write = getWrite({ onError });
      await expect(write()).resolves.toBeUndefined();
    });

    it("attempts the write", () => {
      expect(mockWriteContractAsync).toHaveBeenCalled();
    });

    it("calls onError", () => {
      expect(onError).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("error message passed to onError", () => {
    const onError = vi.fn();

    it.each([
      ["BaseError", new BaseError("short msg"), "short msg"],
      ["Error", new Error("plain msg"), "plain msg"],
      ["non-Error", "string throw", "string throw"],
    ])("uses the %s message", async (_, thrown, message) => {
      mockSimulateContract.mockRejectedValueOnce(thrown);
      const write = getWrite({ onError });

      await write();

      expect(onError).toHaveBeenCalledWith(new Error(message));
    });
  });
});
