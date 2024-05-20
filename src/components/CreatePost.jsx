"use client";

import { useState } from "react";

export default () => {
  const maxCount = 140;

  const [text, setText] = useState("");
  const [charCount, setChatCount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(text);
  };

  const handleChange = (e) => {
    e.preventDefault();

    const newText = e.target.value;

    if (newText.length <= maxCount) {
      setText(newText);
    }
  };

  return (
    <div className="max-w-sm">
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <textarea
          rows="5"
          className="w-full p-2 bg-teal-900 resize-none"
          placeholder="Whats on your mind..."
          value={text}
          onChange={handleChange}
        />
        <div className="bg-teal-500 flex flex-row w-full content-center items-center px-8">
          <span className="grow">
            {text.length} / {maxCount}
          </span>
          <button className="py-2 px-4 hover:bg-teal-900" type="submit">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};
