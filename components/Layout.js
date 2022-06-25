import React from "react";
import Footer from "./Footer";
import Hero from "./Hero";
import IntroAnimation from "./IntroAnimation";
import Nav from "./Nav";
export default function Layout({ children }) {
  return (
    <div className="flex flex-col justify-between min-h-full min-w-full  ">
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-size: 18px;
          font-weight: 400;
          line-height: 1.8;
          color: #333;
          font-family: sans-serif;
          background: #003941;
        }
        h1 {
          font-weight: 700;
        }
        p {
          margin-bottom: 10px;
        }
     
      `}</style>
      {/* <IntroAnimation /> */}
      <Nav />
      {/* <Hero /> */}
      <main  style={{ zIndex: "10" }}>{children}</main>

      <Footer />
    </div>
  );
}
