import * as React from "react";
import { useEffect, useRef, useState } from "react";

export const Enochian = () => {
  const [selectedAstrological, setSelectedAstrological] = useState("sol");
  const [enochianOutput, setEnochianOutput] = useState<string[]>([]);
  const [pronounciation, setPronounciation] = useState("");

  const signs: { [key: string]: string } = {
    "♄": "saturn",
    "♃": "jupiter",
    "♂": "mars",
    "☉": "sol",
    "♀": "venus",
    "☿": "mercury",
    "☽": "luna",
    "♈︎": "aries",
    "♉︎": "taurus",
    "♊︎": "gemini",
    "♋︎": "cancer",
    "♌︎": "leo",
    "♍︎": "virgo",
    "♎︎": "libra",
    "♏︎": "scorpio",
    "♐︎": "sagittarius",
    "♑︎": "capricorn",
    "♒︎": "aquarius",
    "♓︎": "pisces",
  };

  const enochianPronounciation = (enochianName: string[]) => {
    const inputArr = enochianName;
    const outputArr = [];
    for (let i = 0; i < inputArr.length; i++) {
      const enochianLetter: string = enochianName[i];
      const syllable: string = enochianSounds[enochianLetter];
      outputArr.push(syllable);
    }
    const output = outputArr.join("-");
    return output.replace("--", "\n");
  };

  const enochianToName = (
    enochianWord: string,
    chart: "planet" | "zodiac",
    astrological: string,
    polarity: "good" | "evil"
  ) => {
    const inputArr = enochianWord.split(" ");
    const outputArr = [];
    for (let i = 0; i < inputArr.length; i++) {
      const inputLetter = inputArr[i];
      const col =
        chart == "planet" ? planets[astrological] : zodiac[astrological];
      const row =
        polarity == "good"
          ? enochianOrder[inputLetter]
          : 20 - enochianOrder[inputLetter];
      const outputLetter =
        chart == "planet" ? planetMatrix[col][row] : zodiacMatrix[col][row];
      outputArr.push(outputLetter == undefined ? "space" : outputLetter);
    }
    return outputArr.reverse();
  };

  const englishToEnochian = (englishWord: string) => {
    let enochianWord = "";
    for (let i = 0; i < englishWord.length; i++) {
      const englishLetter: string = englishWord.substring(i, i + 1);
      enochianWord = enochianWord + " " + englishToEnoch[englishLetter];
    }
    return enochianWord.trim();
  };

  const planets: { [key: string]: number } = {
    luna: 0,
    mercury: 1,
    venus: 2,
    sol: 3,
    jupiter: 4,
    mars: 5,
    saturn: 6,
  };

  const zodiac: { [key: string]: number } = {
    pisces: 0,
    aquarius: 1,
    capricorn: 2,
    sagittarius: 3,
    scorpio: 4,
    libra: 5,
    virgo: 6,
    leo: 7,
    cancer: 8,
    gemini: 9,
    taurus: 10,
    aries: 11,
  };

  const englishToEnoch: { [key: string]: string } = {
    a: "un",
    b: "pa",
    c: "veh",
    d: "gal",
    e: "graph",
    f: "or",
    g: "ged",
    h: "na",
    i: "gon",
    j: "gon",
    k: "veh",
    l: "ur",
    m: "tal",
    n: "drux",
    o: "med",
    p: "mals",
    q: "ger",
    r: "don",
    s: "fam",
    t: "gisg",
    u: "van",
    v: "van",
    w: "van van",
    x: "pal",
    y: "gon",
    z: "ceph",
  };

  const planetMatrix: Array<Array<string>> = [
    [
      "pa",
      "tal",
      "pal",
      "pa",
      "tal",
      "pal",
      "pa",
      "tal",
      "pal",
      "pa",
      "tal",
      "pal",
      "pa",
      "tal",
      "pal",
      "pa",
      "tal",
      "pal",
      "pa",
      "tal",
      "pal",
      "pa",
      "tal",
      "pal",
    ],
    [
      "veh",
      "gon",
      "med",
      "veh",
      "gon",
      "med",
      "veh",
      "gon",
      "med",
      "veh",
      "gon",
      "med",
      "veh",
      "gon",
      "med",
      "veh",
      "gon",
      "med",
      "veh",
      "gon",
      "med",
      "veh",
      "gon",
      "med",
    ],
    [
      "ged",
      "na",
      "don",
      "ged",
      "na",
      "don",
      "ged",
      "na",
      "don",
      "ged",
      "na",
      "don",
      "ged",
      "na",
      "don",
      "ged",
      "na",
      "don",
      "ged",
      "na",
      "don",
    ],
    [
      "gal",
      "ur",
      "ceph",
      "gal",
      "ur",
      "ceph",
      "gal",
      "ur",
      "ceph",
      "gal",
      "ur",
      "ceph",
      "gal",
      "ur",
      "ceph",
      "gal",
      "ur",
      "ceph",
      "gal",
      "ur",
      "ceph",
    ],
    [
      "or",
      "mals",
      "van",
      "or",
      "mals",
      "van",
      "or",
      "mals",
      "van",
      "or",
      "mals",
      "van",
      "or",
      "mals",
      "van",
      "or",
      "mals",
      "van",
      "or",
      "mals",
      "van",
    ],
    [
      "un",
      "ger",
      "fam",
      "un",
      "ger",
      "fam",
      "un",
      "ger",
      "fam",
      "un",
      "ger",
      "fam",
      "un",
      "ger",
      "fam",
      "un",
      "ger",
      "fam",
      "un",
      "ger",
      "fam",
    ],
    [
      "graph",
      "drux",
      "gisg",
      "graph",
      "drux",
      "gisg",
      "graph",
      "drux",
      "gisg",
      "graph",
      "drux",
      "gisg",
      "graph",
      "drux",
      "gisg",
      "graph",
      "drux",
      "gisg",
      "graph",
      "drux",
      "gisg",
    ],
  ];

  const zodiacMatrix: Array<Array<string>> = [
    [
      "pa",
      "ger",
      "gal",
      "med",
      "graph",
      "van",
      "na",
      "pa",
      "ger",
      "gal",
      "med",
      "graph",
      "van",
      "na",
      "pa",
      "ger",
      "gal",
      "med",
      "graph",
      "van",
      "na",
    ],
    [
      "veh",
      "drux",
      "or",
      "don",
      "tal",
      "fam",
      "ur",
      "veh",
      "drux",
      "or",
      "don",
      "tal",
      "fam",
      "ur",
      "veh",
      "drux",
      "or",
      "don",
      "tal",
      "fam",
      "ur",
    ],
    [
      "ged",
      "pal",
      "un",
      "ceph",
      "gon",
      "gisg",
      "ger",
      "ged",
      "pal",
      "un",
      "ceph",
      "gon",
      "gisg",
      "ger",
      "ged",
      "pal",
      "un",
      "ceph",
      "gon",
      "gisg",
      "ger",
    ],
    [
      "gal",
      "med",
      "graph",
      "van",
      "na",
      "pa",
      "ger",
      "gal",
      "med",
      "graph",
      "van",
      "na",
      "pa",
      "ger",
      "gal",
      "med",
      "graph",
      "van",
      "na",
      "pa",
      "ger",
    ],
    [
      "or",
      "don",
      "tal",
      "fam",
      "ur",
      "van",
      "drux",
      "or",
      "don",
      "tal",
      "fam",
      "ur",
      "van",
      "drux",
      "or",
      "don",
      "tal",
      "fam",
      "ur",
      "van",
      "drux",
    ],
    [
      "un",
      "ceph",
      "gon",
      "gisg",
      "ger",
      "ged",
      "pal",
      "un",
      "ceph",
      "gon",
      "gisg",
      "ger",
      "ged",
      "pal",
      "un",
      "ceph",
      "gon",
      "gisg",
      "ger",
      "ged",
      "pal",
    ],
    [
      "graph",
      "van",
      "na",
      "pa",
      "ger",
      "gal",
      "med",
      "graph",
      "van",
      "na",
      "pa",
      "ger",
      "gal",
      "med",
      "graph",
      "van",
      "na",
      "pa",
      "ger",
      "gal",
      "med",
    ],
    [
      "tal",
      "fam",
      "ur",
      "veh",
      "drux",
      "or",
      "don",
      "tal",
      "fam",
      "ur",
      "veh",
      "drux",
      "or",
      "don",
      "tal",
      "fam",
      "ur",
      "veh",
      "drux",
      "or",
      "don",
    ],
    [
      "gon",
      "gisg",
      "mals",
      "ged",
      "pal",
      "un",
      "ceph",
      "gon",
      "gisg",
      "mals",
      "ged",
      "pal",
      "un",
      "ceph",
      "gon",
      "gisg",
      "mals",
      "ged",
      "pal",
      "un",
      "ceph",
    ],
    [
      "na",
      "pa",
      "ger",
      "gal",
      "med",
      "graph",
      "van",
      "na",
      "pa",
      "ger",
      "gal",
      "med",
      "graph",
      "van",
      "na",
      "pa",
      "ger",
      "gal",
      "med",
      "graph",
      "van",
    ],
    [
      "ur",
      "veh",
      "drux",
      "or",
      "don",
      "tal",
      "fam",
      "ur",
      "veh",
      "drux",
      "or",
      "don",
      "tal",
      "fam",
      "ur",
      "veh",
      "drux",
      "or",
      "don",
      "tal",
      "fam",
    ],
    [
      "mals",
      "ged",
      "pal",
      "un",
      "ceph",
      "gon",
      "gisg",
      "mals",
      "ged",
      "pal",
      "un",
      "ceph",
      "gon",
      "gisg",
      "mals",
      "ged",
      "pal",
      "un",
      "ceph",
      "gon",
      "gisg",
    ],
  ];

  const enochianOrder: { [key: string]: number } = {
    pa: 0,
    veh: 1,
    ged: 2,
    gal: 3,
    or: 4,
    un: 5,
    graph: 6,
    tal: 7,
    gon: 8,
    na: 9,
    ur: 10,
    mals: 11,
    ger: 12,
    drux: 13,
    pal: 14,
    med: 15,
    don: 16,
    ceph: 17,
    van: 18,
    fam: 19,
    gisg: 20,
  };

  const enochianSounds: { [key: string]: string } = {
    pa: "B",
    veh: "C",
    ged: "G",
    gal: "D",
    or: "F",
    un: "A",
    graph: "E",
    tal: "M",
    gon: "I",
    na: "H",
    ur: "L",
    mals: "P",
    ger: "Q",
    drux: "N",
    pal: "X",
    med: "O",
    don: "R",
    ceph: "Z",
    van: "V",
    fam: "S",
    gisg: "T",
  };

  let enochianInput = useRef<HTMLTextAreaElement>(null);

  const renderEnochian = (astrological: string) => {
    const inputText = enochianInput.current!.value;
    const polarity = "good";
    const chart = Object.keys(planets).includes(astrological)
      ? "planet"
      : "zodiac";

    const enochianWord: string = englishToEnochian(inputText.toLowerCase());
    const enochianName: string[] = enochianToName(
      enochianWord,
      chart,
      astrological,
      polarity
    );
    setEnochianOutput(enochianName);
    const enochPronounciation = enochianPronounciation(enochianName);
    setPronounciation(enochPronounciation);
  };

  const inputChanged = () => {
    renderEnochian(selectedAstrological);

    // handle resizing the textarea if needed
    if (typeof enochianInput != null) {
      enochianInput.current!.style.height = "auto";
      enochianInput.current!.style.height =
        enochianInput.current!.scrollHeight + "px";
    }
  };

  useEffect(() => {
    // handle resizing the textarea if needed
    enochianInput.current!.style.height = "auto";
    enochianInput.current!.style.height =
      enochianInput.current!.scrollHeight + "px";
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "fit-content",
        alignItems: "center",
      }}
    >
      <div className="ui-box" style={{ width: 500 }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            fontWeight: 900,
          }}
        >
          <span
            style={{
              alignSelf: "center",
              paddingLeft: "0.5em",
              paddingRight: "0.5em",
            }}
          >
            &gt;
          </span>
          <textarea
            rows={1}
            ref={enochianInput}
            onChange={inputChanged}
            style={{
              background: "transparent",
              color: "#0f0",
              width: "100%",
              border: "none",
              fontSize: "1.2em",
              fontWeight: 900,
              fontFamily: "monospace",
              height: 21,
            }}
          ></textarea>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: 500,
          width: "100%",
        }}
      >
        {Object.keys(signs).map((sign: string) => (
          <div
            key={signs[sign]}
            className={
              selectedAstrological == signs[sign]
                ? "symbol-btn-selected"
                : "symbol-btn"
            }
            onClick={() => {
              setSelectedAstrological(signs[sign]);
              renderEnochian(signs[sign]);
            }}
          >
            {sign}
          </div>
        ))}
      </div>
      <div>
        {enochianOutput.map((letter: string, index: number) =>
          letter == "space" ? (
            <br key={letter + index} />
          ) : (
            <img
              key={letter + index}
              className="enochian-letter"
              src={"enochian-letters/" + letter + ".webp"}
            />
          )
        )}
      </div>
      {pronounciation}
    </div>
  );
};
