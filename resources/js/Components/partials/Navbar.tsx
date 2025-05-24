import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Sheet, SheetContent } from "@/Components/ui/sheet";
import Logo from "@/Assets/Logotype_1.png";
import { MenuIcon } from "lucide-react";
import { useNavbarContext } from "@/Context/NavbarContext";

const navItems = [
    {
        label: "Accueil",
        link: "/",
    },
    {
        label: "Déconnexion",
        link: "/logout",
    }
]

const NavItem = ({ label, link }: { label: string, link: string }) => {

    return (
        <li>
            <Link href={link}>
                <Button variant="link" className={"text-primary-foreground text-xl"}>{label}</Button>
            </Link>
        </li>
    )

}

const SheetMenu = () => {
    const { open, setOpen } = useNavbarContext()
    return (
        <Sheet open={open} onOpenChange={() => setOpen(false)}>
            <SheetContent className={"bg-primary"}>
                <div className="flex flex-col items-center justify-center w-full h-full list-none">
                    {navItems.map((item, index) => <NavItem link={item.link} label={item.label}
                        key={`${item.label}-${index}`} />)}
                </div>
            </SheetContent>
        </Sheet>

    )
}

const Navbar = () => {
    const { setOpen } = useNavbarContext()
    return (
        <>
            <nav className={"w-screen h-24 bg-primary"}>
                <div className={"container mx-auto flex flex-row h-full items-center justify-between"}>
                    <div className={"flex items-center justify-center text-primary-foreground text-2xl font-semibold"}>
                        <Link href="/">
                            <img src={Logo} alt="Logo" className={"h-24"} />
                        </Link>
                        <p>Déclaration Réseau / Web</p>
                    </div>
                    <ul className={"hidden sm:flex flex-row items-center justify-center"}>
                        {navItems.map((item, index) => <NavItem link={item.link} label={item.label}
                            key={`${item.label}-${index}`} />)}
                    </ul>
                    <div className={"sm:hidden block "}>
                        <Button variant="link" onClick={() => setOpen(true)}
                            className={"text-primary-foreground text-xl"}>
                            <MenuIcon size={50} className={"h-14 w-14 text-primary-foreground sm:hidden"} />
                        </Button>
                    </div>
                </div>
            </nav>
            <SheetMenu />
        </>
    )
}

export default Navbar;
