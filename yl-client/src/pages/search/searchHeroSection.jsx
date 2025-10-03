import playAudio from "../../utils/playAudio.js";
import { useState } from "react";
import Tooltip from "../../components/toolTip";
export default function SearchHeroSection({ props }) {
  const [isMouseOverTitle, setIsMouseOverTitle] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  if (!props || (props.lexicalEntries && props.lexicalEntries.length === 0)) {
    return (
      <div className="my-8 text-center">
        <p className="w-fit mx-auto">
          We couldn’t find a definition for “
          <span className="font-bold">{props.word}</span>”.
        </p>
      </div>
    );
  }

  return (
    <div className="my-4">
      {isMouseOverTitle && (
        <Tooltip text="Click to Pronounce" x={mouseX + 20} y={mouseY + 20} />
      )}
      <h2
        className="anton-regular text-center text-8xl w-fit mx-auto speakerCursor"
        onClick={() => playAudio(props?.lexicalEntries[0]?.pronunciations[0]?.audio)}
        onMouseEnter={() => setIsMouseOverTitle(true)}
        onMouseLeave={() => setIsMouseOverTitle(false)}
        onMouseMove={(e) => {
          setMouseX(e.clientX);
          setMouseY(e.clientY);
        }}
      >
        {props.word}
      </h2>
      <p className="w-full text-center mx-auto my-4 text-2xl text-text-muted ">
        {props?.lexicalEntries && props.lexicalEntries.length > 0
          ? props.lexicalEntries[0]?.pronunciations[0]?.phoneticSpelling
          : "N/A"}
       
      </p>
      {/* <p className="" onClick={() => playAudio(props.audio)}>
               audio : <SpeakerWaveIcon className="w-8" />
             </p> */}
    </div>
  );
}
