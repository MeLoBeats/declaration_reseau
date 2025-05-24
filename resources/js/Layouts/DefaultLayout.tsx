import React from 'react';
import Navbar from "@/Components/partials/Navbar";
import NavbarContextProvider from "@/Context/NavbarContext";

type DefaultLayoutProps = {
    children: React.ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    return (
        <NavbarContextProvider>
            <Navbar />
            <div className={"container mx-auto"}>
                {children}
            </div>
        </NavbarContextProvider>
    );
};

export default DefaultLayout;
