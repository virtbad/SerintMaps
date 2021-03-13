import React from "react";
import { useGlobal } from "../context/GlobalContext";
import { CosmeticColor, CosmeticType } from "../types";

const CosmeticSelector: React.FC = (): JSX.Element => {
  const { cosmetic, setCosmetic } = useGlobal();

  return (
    <>
      {Object.entries(CosmeticColor).map(([key, value], index) => {
        return (
          <button
            className="title-element button"
            key={index}
            style={{ borderColor: cosmetic === key ? value : "" }}
            children={key[0] + key.substr(1).toLowerCase()}
            onClick={() => setCosmetic(key as CosmeticType)}
          />
        );
      })}
    </>
  );
};

export default CosmeticSelector;
