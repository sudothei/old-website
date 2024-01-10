import * as React from "react";
import { useEffect, useRef } from "react";
import port from "static/media/port.webp";
// @ts-ignore
import aalib from "aalib.js";

export const Port = () => {
  const canvasRef: React.RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    aalib.read.image
      .fromURL(port)
      .map(aalib.filter.contrast(1))
      .map(
        aalib.aa({
          width: 192 * 1.25,
          height: 108,
        })
      )
      .map(aalib.filter.contrast(0.8))
      .map(aalib.filter.brightness(70))
      .map(
        aalib.render.canvas({
          el: document.querySelector(".portone"),
          background: "transparent",
          color: "#0f0",
          width: 1920,
          height: 1080,
          lineHeight: 15,
          fontSize: 15,
          fontFamily: "Syne Mono",
        })
      )
      .subscribe();

    const ctx = canvasRef.current!.getContext("2d");

    const interval = setInterval(() => {
      for (let x = 0; x < canvasRef.current!.width; x++) {
        for (let y = 0; y < canvasRef.current!.height; y++) {
          let number = Math.floor(Math.random() * 40);
          ctx!.fillStyle =
            "rgba(" + number + "," + number + "," + number + "," + 1 + ")";
          ctx!.fillRect(x, y, 1, 1);
        }
      }
    }, 1000 / 24);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{ position: "absolute" }}>
      <canvas
        className="static"
        style={{ width: "100vw", height: "100vh", position: "absolute" }}
        ref={canvasRef}
      />
      <canvas
        className="portone"
        style={{ width: "100vw", height: "100vh", position: "absolute" }}
      />
    </div>
  );
};
