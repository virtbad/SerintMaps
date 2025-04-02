import React, { useEffect, useRef } from "react";
import GameField from "./GameField";
import { Status } from "../types";
import { version } from "../version";
import { useGlobal } from "../context/GlobalContext";
import PenSelector from "./PenSelector";
import RgbSelector from "./RgbSelector";
import DimensionsSelector from "./DimensionSelector";
import DownloadButton from "./DownloadButton";
import UploadButton from "./UploadButton";
import ModeSelector from "./ModeSelector";
import ActionSelector from "./ActionSelector";
import CosmeticSelector from "./CosmeticSelector";
import NameSelector from "./NameSelector";

const App: React.FC = (): React.ReactNode => {
  const { mode } = useGlobal();
  const ref = useRef<HTMLInputElement>(null);

  return (
    <main
      className="main"
      ref={ref}
      onContextMenu={(event: React.MouseEvent<HTMLElement, MouseEvent>) => event.preventDefault()}
    >
      <header className="title-container">
        <div className="subcontainer">
          <p className="title-element" children="serint-maps" />
          <DimensionsSelector />
        </div>
        <div className="subcontainer">
          <div className="button-container">
            {mode === "TILE" && <PenSelector />}
            {mode === "LIGHT" && <RgbSelector />}
            {mode === "ACTION" && <ActionSelector />}
            {mode === "COSMETIC" && <CosmeticSelector />}
          </div>
        </div>
        <div className="subcontainer">
          <DownloadButton />
          <UploadButton />
        </div>
      </header>
      <div className="center">
        <GameField />
      </div>
      <footer className="foot-container">
        <div className="subcontainer" children={<NameSelector />} />
        <div className="subcontainer" children={<ModeSelector />} />
        <div className="subcontainer version" children={version(Status.RELEASE)} />
      </footer>
    </main>
  );
};

export default App;
