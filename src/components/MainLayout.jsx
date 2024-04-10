import React from 'react';
import NavBar from "@/components/NavBar";

const MainLayout = ({children}) => {
    return (
        <section>
            <NavBar/>
            <div >{children}</div>
        </section>
    );
};

export default MainLayout;