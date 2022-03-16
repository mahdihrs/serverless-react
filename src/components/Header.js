import React from "react";

import menu from './data/menuLinks.json'

export default function Header() {
  return (
    <header id="intro">
      <article className="fullheight">
        <div className="hgroup">
          <h1>Landon Hotel</h1>
          <h2>West London</h2>
          <p><a href="#welcome"><img src="https://landonhotel.com/images/misc/arrow.png" alt="down arrow" /></a></p>
        </div>
      </article>

      <nav id="nav">
        <div className="navbar">
          <div className="brand"><a href="#welcome">Landon <span>Hotel</span></a></div>
          <ul>
            {menu.map((list) => <li key={list.text}><a className={`icon ${list.class}`} href={list.href}><span>{list.text}</span></a></li>)}
          </ul>
        </div>
      </nav>
    </header>
  )
}
