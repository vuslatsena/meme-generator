/* eslint-disable @next/next/no-img-element */
"use client";
import { useContext, useState, useRef } from "react";
import {
  Label,
  Radio,
  RangeSlider,
  Select,
  TextInput,
  Button,
  Spinner,
} from "flowbite-react";
import { MemeContext } from "./context/memeContext";
import { saveAs } from "file-saver";
import html2canvas from 'html2canvas';

export default function Home() {
  let Draggable = require("react-draggable");
  const { randomMeme, getRandomMeme } = useContext(MemeContext);
  const memeContainerRef = useRef(null);

  const [memeValues, setMemeValues] = useState({
    topText: "Top Text",
    bottomText: "Bottom Text",
    caps: "uppercase",
    color: "white",
    shadow: "1px 1px 17px rgba(0,0,0,0.83)",
    size: 1.5,
    font: "serif",
  });

  const resetHandler = () => {
    setMemeValues({
      topText: "Top Text",
      bottomText: "Bottom Text",
      caps: "uppercase",
      color: "white",
      shadow: "1px 1px 17px rgba(0,0,0,0.83)",
      size: 1.5,
      font: "Sans",
    });
  };

  const onChangeHandler = (e) => {
    setMemeValues({ ...memeValues, [e.target.name]: e.target.value });
  };

  const downloadMeme = () => {
    const memeContainer = memeContainerRef.current;
  
    html2canvas(memeContainer, { useCORS: true }).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, "meme.png");
      });
    });
  };  
  
  return (
    <main className="bg-blue-900 flex min-h-screen flex-col items-center justify-center p-24">
      <div
        id="content"
        className="grid lg:grid-cols-2 gap-4 max-w-screen-lg p-8 border-20 rounded-lg justify-center shadow-m"
      >
        <div className=" flex flex-col gap-20 p-10">
          <div className="text-center grid gap-2">
            <h1 className="text-3xl">Meme Generator</h1>
            <p>
              Click{" "}
              <button className="text-orange-600" onClick={getRandomMeme}>
                Here
              </button>{" "}
              to get a random meme template!
            </p>
          </div>
          {randomMeme ? (
            <div className="relative" ref={memeContainerRef}>
              {randomMeme && <img src={randomMeme.url} alt="" />}
              {memeValues.topText && (
                <Draggable>
                  <p
                    className={`font-extrabold ${memeValues.caps}`}
                    style={{
                      fontFamily: `${memeValues.font}`,
                      textShadow: `${memeValues.shadow}`,
                      color: `${memeValues.color}`,
                      fontSize: `${memeValues.size}rem`,
                    }}
                    id="top"
                  >
                    {memeValues.topText}
                  </p>
                </Draggable>
              )}
              {memeValues.bottomText && (
                <Draggable>
                  <p
                    id="bottom"
                    className={`font-extrabold ${memeValues.caps}`}
                    style={{
                      fontFamily: `${memeValues.font}`,
                      textShadow: `${memeValues.shadow}`,
                      color: `${memeValues.color}`,
                      fontSize: `${memeValues.size}rem`,
                    }}
                  >
                    {memeValues.bottomText}
                  </p>
                </Draggable>
              )}
            </div>
          ) : (
            <div className="flex justify-center">
              {" "}
              <Spinner
                aria-label="Info spinner example"
                color="info"
                size="xl"
              />
            </div>
          )}
        </div>
        <div className="lg:border-l-2 border-t-2 lg:border-t-0 p-8 grid gap-4">
          <div className="">
            <div className="mb-2">
              <div className="mb-1 block">
                <Label
                  htmlFor="topText"
                  value="Top Text"
                  style={{ fontWeight: "bold" }}
                />
              </div>
              <TextInput
                type="text"
                id="topText"
                name="topText"
                value={memeValues.topText}
                onChange={onChangeHandler}
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label
                  htmlFor="bottomText"
                  value="Bottom Text"
                  style={{ fontWeight: "bold" }}
                />
              </div>
              <TextInput
                type="text"
                id="bottomText"
                name="bottomText"
                value={memeValues.bottomText}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div>
            <fieldset
              className="flex max-w-md flex-col gap-4"
              id="radioCaps"
              name="caps"
              value={memeValues.caps}
            >
              <legend className="mb-4" style={{ fontWeight: "bold" }}>
                Uppercase or Regular
              </legend>
              <div className="flex items-center gap-2">
                <Radio
                  id="caps"
                  name="caps"
                  value="uppercase"
                  onChange={onChangeHandler}
                  defaultChecked
                />
                <Label htmlFor="noCaps">UPPERCASE</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="noCaps"
                  name="caps"
                  value=""
                  onChange={onChangeHandler}
                />
                <Label htmlFor="germany">Regular</Label>
              </div>
            </fieldset>
          </div>
          <div>
            <fieldset
              className="flex max-w-md flex-col gap-4"
              id="radioColor"
              name="color"
              value={memeValues.color}
              onChange={onChangeHandler}
            >
              <legend className="mb-4" style={{ fontWeight: "bold" }}>
                Text Color
              </legend>
              <div className="flex items-center gap-2">
                <Radio id="white" name="color" value="white" defaultChecked />
                <Label htmlFor="white">White</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio id="black" name="color" value="black" />
                <Label htmlFor="black">Black</Label>
              </div>
            </fieldset>
          </div>
          <div>
            <fieldset
              className="flex max-w-md flex-col gap-4"
              id="radio"
              name="shadow"
              value={memeValues.shadow}
              onChange={onChangeHandler}
            >
              <legend className="mb-4" style={{ fontWeight: "bold" }}>
                Text Shadow
              </legend>
              <div className="flex items-center gap-2">
                <Radio
                  id="shadow"
                  name="shadow"
                  value="1px 1px 17px rgba(0,0,0,0.83)"
                  defaultChecked
                />
                <Label htmlFor="shadow">Shadow</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio id="noShadow" name="shadow" value="none" />
                <Label htmlFor="noShadow">No Shadow</Label>
              </div>
            </fieldset>
          </div>
          <div>
            <div className="">
              <Label
                htmlFor="size"
                value="Text Size"
                style={{ fontWeight: "bold" }}
              />
            </div>
            <RangeSlider
              id="size"
              name="size"
              min="1"
              max="8"
              step="1"
              value={memeValues.size}
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <div className="" id="select">
              <div className="mb-1 block">
                <Label
                  htmlFor="fonts"
                  value="Select Font"
                  style={{ fontWeight: "bold" }}
                />
              </div>
              <Select
                id="fonts"
                name="font"
                value={memeValues.font}
                onChange={onChangeHandler}
              >
                <option value="sans-serif">Sans</option>
                <option value="serif">Serif</option>
                <option value="system-ui">System</option>
              </Select>
            </div>
          </div>
          <Button onClick={resetHandler} color="light">
            Reset
          </Button>
          <Button
            onClick={downloadMeme}
            color="success"
          >
            Download Meme
          </Button>
        </div>
      </div>
    </main>
  );
}