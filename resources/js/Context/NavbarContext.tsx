import React, {createContext, useContext} from "react";

const NavbarContext = createContext<{ open: boolean, setOpen: (isOpen: boolean) => void }>({
    open: false, setOpen: () => {
    }
})

const NavbarContextProvider = ({children}: { children: React.ReactNode }) => {
    const [open, setOpen] = React.useState(false)
    return (
        <NavbarContext.Provider value={{
            open,
            setOpen,
        }}>
            {children}
        </NavbarContext.Provider>
    )
}

export const useNavbarContext = () => useContext(NavbarContext)

export default NavbarContextProvider;
