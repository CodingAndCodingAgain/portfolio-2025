import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

const splitInChunks = ({text, length} : {text: string, length: number}) => {
  const chunks = [];
  let textPart = "";
  for(let i = 0; i < text.length; i++){
    if( i > 0 && (i % length) === 0){
      chunks.push(textPart);
      textPart = "";
    }

    textPart = textPart + text[i];
  }

  chunks.push(textPart);

  return chunks;
}

const TextTypeWritter = ({text, duration, onComplete} : { text: string, duration?: number, onComplete?: () => void }) => {
  const textScope = useRef(null);
  const textElements = splitInChunks({text, length: text.length});

  useGSAP(() => {
    const timeline = gsap.timeline({ defaults: { ease: "none" }});
    textElements.forEach((text, index) => {
      timeline.to(`.textElement-${index}`, {
        scrambleText: {
          text,
          chars: '01@#:/[]',
          tweenLength: false,
        },
        duration: duration ?? Math.min(0.6, Math.floor(text.length / 5) ),
        onComplete
      })
    })
  }, { scope: textScope });

  return <div ref={textScope}>
      {textElements.map((_, index) => <span key={index} className={`textElement-${index}`}/>)}
  </div>
}

export default TextTypeWritter;