import React, { ComponentProps, useEffect, useMemo, useRef } from "react";

interface IPinInput extends ComponentProps<"input"> {
  width?: string;
  gap?: string;
  pin: string;
  setPin: (pin: string) => void;
  pinLength: number;
  allowletters?: boolean;
}
const PinInput: React.FC<IPinInput> = (props) => {
  const { pin, setPin, pinLength, width = "380px", gap = "36px", allowletters = false } = props;
  const regex = allowletters ? /[A-Za-z0-9]+/ : /^\d+$/;
  const valueItems = useMemo(() => {
    const pinArray = pin.split("");
    const items: string[] = [];

    for (let i = 0; i < pinLength; i++) {
      const char = pinArray[i];

      if (char && regex.test(char)) {
        items.push(char);
      } else {
        items.push("");
      }
    }
    return items;
  }, [pin, pinLength]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    let targetValue = e.target.value.trim();

    if (!regex.test(e.target.value) && targetValue !== "") {
      return;
    }
    if (targetValue.length === pinLength) {
      setPin(targetValue);
      e.target.blur();
      return;
    }

    targetValue = regex.test(targetValue) ? targetValue : " ";
    const newPin = pin.substring(0, idx) + targetValue + pin.substring(idx + 1);
    setPin(newPin);

    if (!regex.test(e.target.value)) {
      return;
    }

    if (e.target.nextElementSibling) {
      (e.target.nextElementSibling as any).focus();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      if (target.nextElementSibling) (target.nextElementSibling as HTMLInputElement).focus();
    }

    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      if (target.previousElementSibling) (target.previousElementSibling as HTMLInputElement).focus();
    }
    target.setSelectionRange(0, target.value.length);
    if (e.key !== "Backspace" || target.value !== "") {
      return;
    }

    if (target.previousElementSibling) {
      (target.previousElementSibling as HTMLInputElement).focus();
    }
  };

  return (
    <div
      className="pin-code-input"
      style={{
        display: "grid",
        width,
        gap,
        gridTemplateColumns: `repeat(${pinLength}, 1fr)`,
      }}
    >
      {valueItems.map((p, idx) => (
        <input
          key={idx}
          value={p}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1}"
          // maxLength={1}
          className=" focus-visible:outline-none border border-[#C2C2C2] h-14 rounded"
          placeholder="__"
          onChange={(e) => onChange(e, idx)}
          onKeyDown={onKeyDown}
          onFocus={(e) => e.target.setSelectionRange(0, e.target.value.length)}
        />
      ))}
    </div>
  );
};

export default PinInput;
