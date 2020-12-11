import React from "react";

import Header from "./Header";
import MainSection from "./MainSection";

const App = () => {
    return (
        <div className="page-wrap">
            <section id="main">
                <Header />
                <MainSection />
            </section>
        </div>
    );
};

export default App;
