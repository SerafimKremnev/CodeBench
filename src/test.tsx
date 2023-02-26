import React, { FormEventHandler } from "react";
import styles from "./Results.module.css";

function Inputs() {
  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        // console.log(data.get("text 6"));
        for (const pair of data.entries()) {
          console.log(`${pair[0]}, ${pair[1]}`);
        }
      }}
    >
      <input type='text' value='text 11' name='text 1' onChange={() => {}} />
      <input type='text' value='text 22' name='text 2' onChange={() => {}} />
      <input type='text' value='text 33' name='text 3' onChange={() => {}} />
      <input type='text' value='text 44' name='text 4' onChange={() => {}} />
      <input type='text' value='text 55' name='text 5' onChange={() => {}} />

      <input type='button' value='text 66' name='text 6' onChange={() => {}} />
      <textarea name='textarea' value='textarea-txt' onChange={() => {}} />
      <button type='submit' name='btn'>
        send
      </button>
    </form>
  );
}

export default Inputs;
