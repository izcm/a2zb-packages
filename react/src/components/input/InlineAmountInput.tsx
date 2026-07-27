import { useEffect, useRef, useState } from "react";

import { TextInput } from "./TextInput";

type InlineAmountInputProps = {
  label: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSubmit: (amount: string) => void;
};

export function InlineAmountInput({
  label,
  open,
  onOpen,
  onClose,
  onSubmit,
}: InlineAmountInputProps) {
  const [amount, setAmount] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) ref.current?.focus();
  }, [open]);

  function confirm() {
    if (!amount) {
      onClose();
      return;
    }

    onSubmit(amount);
    setAmount("");
    onClose();
  }

  return (
    <div className="flex items-center gap-2">
      {open && (
        <TextInput
          ref={ref}
          value={amount}
          onChange={setAmount}
          onSubmit={confirm}
          numeric
          className="p-0 h-5 border-l-0 border-r-0 border-t-0 rounded-none box-border leading-5 w-20 bg-transparent text-sm text-right outline-none border-b border-accent/40"
        />
      )}
      <button
        onClick={open ? confirm : onOpen}
        className="cursor-pointer text-sm text-subtle underline underline-offset-2 hover:text-white"
      >
        {open ? "Confirm" : label}
      </button>
    </div>
  );
}
