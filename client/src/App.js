import Axios from "axios";
import { useState, useEffect, useRef } from "react";
import "./App.css";

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState("");
  const [text, setText] = useState("");
  const titleRef = useRef(null);
  const createUser = () => {
    if (name && email) {
      Axios.post("http://localhost:3001/createUsers", {
        name: name,
        email: email,
        level: level,
        text: text,
      })
        .then((res) => {
          console.log("User Created");
          setName("");
          setEmail("");
          setLevel("");
          setText("");
        })
        .catch((error) => {
          console.error("Error creating user:", error);
        });
    }
  };

  useEffect(() => {
    class TextScramble {
      constructor(el) {
        this.el = el;
        this.chars = "!<>-_\\/[]{}—=+*^?#________";
        this.update = this.update.bind(this);
      }
      setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => (this.resolve = resolve));
        this.queue = [];
        for (let i = 0; i < length; i++) {
          const from = oldText[i] || "";
          const to = newText[i] || "";
          const start = Math.floor(Math.random() * 40);
          const end = start + Math.floor(Math.random() * 40);
          this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
      }
      update() {
        let output = "";
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
          let { from, to, start, end, char } = this.queue[i];
          if (this.frame >= end) {
            complete++;
            output += to;
          } else if (this.frame >= start) {
            if (!char || Math.random() < 0.28) {
              char = this.randomChar();
              this.queue[i].char = char;
            }
            output += `<span class="dud">${char}</span>`;
          } else {
            output += from;
          }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
          this.resolve();
        } else {
          this.frameRequest = requestAnimationFrame(this.update);
          this.frame++;
        }
      }
      randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
      }
    }

    const phrases = ["ION Club", "Chess Competition", "Be There !!"];
    const fx = new TextScramble(titleRef.current);

    let counter = 0;

    const next = () => {
      fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 800);
      });
      counter = (counter + 1) % phrases.length;
    };

    next();
  }, []); // Empty dependency array to run only once on mount
  return (
    <>
      <header>
        <img src="photos/chess2.png" className="logo" alt="logo" />
      </header>
      <div id="form">
        <p className="title" ref={titleRef}></p>
        <input
          type="text"
          placeholder="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <select
          name="level"
          id="level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="professional">Professional</option>
          <option value="invincible(sikou)">Invincible(sikou)</option>
        </select>
        <input
          type="text"
          placeholder="Anything you want to add"
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={createUser} id="sign">
          Sign Up
        </button>
        <p id="info">
          For More Informations About This Competition Check This Document
        </p>
        <div id="download">
          <a href="doc.pdf" download="ION-CHESS">
            Download
          </a>
        </div>
      </div>
    </>
  );
};