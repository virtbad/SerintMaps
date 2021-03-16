import React from "react";
import { useGlobal } from "../context/GlobalContext";

const NameSelector: React.FC = () => {
  const { name, setName } = useGlobal();

  return (
    <>
      <input
        type="text"
        className="size-input"
        style={{ width: `${name.toString().length}ch` }}
        value={name}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
          if (event.key.length > 1) return;
          setName(name + event.key);
        }}
        onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
          if (event.target.value === "") setName("Unnamed Map");
        }}
      />
    </>
  );
};

export default NameSelector;
