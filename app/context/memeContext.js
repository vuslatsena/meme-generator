import React, { useState, createContext } from "react";
import { useQuery } from "@tanstack/react-query";

const MemeContext = createContext();

function MemeProvider({ children }) {
  const [memes, setMemes] = useState([]);
  const [randomMeme, setRandomMeme] = useState();

  const getMemes = async () => {
    const res = await fetch("https://api.imgflip.com/get_memes");
    const data = await res.json();
    const { memes } = data.data;
    setRandomMeme(
      memes.filter((meme) => meme.box_count === 2)[
        Math.floor(Math.random() * memes.length)
      ]
    );
    return memes;
  };

  const query = useQuery(["memes"], getMemes);

  const getRandomMeme = () => {
    setRandomMeme(
      query.data.filter((meme) => meme.box_count === 2)[
        Math.floor(Math.random() * query.data.length)
      ]
    );
  };

  return (
    <MemeContext.Provider
      value={{ memes, setMemes, randomMeme, setRandomMeme, getRandomMeme }}
    >
      {children}
    </MemeContext.Provider>
  );
}

export { MemeContext, MemeProvider };
