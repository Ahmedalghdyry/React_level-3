import Header from "./header";
import Footer from "./Footer";
import './Loading.css';

import React from "react";

const Loading = () => {
  return (
    <>
      <Header />
      <main>
        <div className="loading"></div>
      </main>
      <Footer />
    </>
  );
};

export default Loading;
