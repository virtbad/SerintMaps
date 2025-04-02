import React from "react";
import { useGlobal } from "../context/GlobalContext";
import { SHA256 } from "crypto-js";

const CosmeticSelector: React.FC = (): React.ReactNode => {
  const { cosmetic, setCosmetic } = useGlobal();

  return (
    <>
      <input
        type="number"
        value={cosmetic}
        className="rgb-input"
        style={{
          width: `${cosmetic.toString().length}ch`,
          borderBottom: `solid 1px #${SHA256(cosmetic.toString()).toString().substring(0, 6)}`,
        }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const isNumber: boolean = !isNaN(Number(event.target.value));
          const number = parseInt(event.target.value) || 0;
          if (!isNumber) event.preventDefault();
          else if (number < 0 || number > 255) event.preventDefault();
          else setCosmetic(parseInt(event.target.value) || 0);
        }}
      />
    </>
  );
};

export default CosmeticSelector;
