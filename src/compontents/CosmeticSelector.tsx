import React, { useState } from "react";
import { useGlobal } from "../context/GlobalContext";
import { SHA256 } from "crypto-js";

const CosmeticSelector: React.FC = (): JSX.Element => {
  const { cosmetic, setCosmetic } = useGlobal();

  return (
    <>
      <input
        type="number"
        value={cosmetic}
        className="rgb-input"
        style={{
          width: `${cosmetic.toString().length}ch`,
          borderBottom: `solid 1px #${SHA256(cosmetic.toString()).toString().substr(0, 6)}`,
        }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setCosmetic(parseInt(event.target.value) || 0);
        }}
        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
          const isNumber: boolean = !isNaN(Number(event.key));
          isNumber && parseInt(cosmetic + "" + event.key) < 256 && setCosmetic(parseInt(cosmetic + "" + event.key));
        }}
      />
    </>
  );
};

export default CosmeticSelector;
