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

const App: React.FC = (): JSX.Element => {
  const { mode, setPen } = useGlobal();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.addEventListener("keypress", handleKeypress);
    return () => document.removeEventListener("keypress", handleKeypress);
  }, []);

  /**
   * Handle a keypress on the document
   *
   * If the keyCode matches a given code a pen gets selected
   *
   * @param event KeyboardEvent
   *
   *  @returns void
   */

  const handleKeypress = (event: KeyboardEvent): void => {
    const gravel: number = 43;
    const grass: number = 34;
    const brick: number = 42;
    const stone: number = 231;
    event.preventDefault();
    const code: number = event.keyCode;
    if (code === gravel) setPen("GRAVEL");
    else if (code === grass) setPen("GRASS");
    else if (code === brick) setPen("BRICK");
    else if (code === stone) setPen("STONE");
  };

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
        <div className="subcontainer version" children={version(Status.PRERELEASE)} />
      </footer>
    </main>
  );
};

export default App;
