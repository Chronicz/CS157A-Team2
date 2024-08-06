import Link from "next/link"
import { NAV_LINKS } from "../constants"
import Button from "../components/buttons";
import Image from "next/image";
const navbar = () => {
    return (
        <nav className="border-2 flexBetween max-container padding-container relative z-30 py-5">
            <Link href="/" className="font-bold">
                COZYFIRM
            </Link>
            <ul className="hidden h-full gap-12 lg:flex">
                {NAV_LINKS.map((link) => (
                    <Link href={link.href} key={link.key} className="font-bold flexCenter cursor-pointer pb-1.5 transition-all hover:font-extrabold">
                        {link.label}
                    </Link>
                ))}
            </ul>

            <Link href="/login">
                <div className="lg:flexCenter hidden">
                    <Button
                        type="button"
                        title="Login"
                        variant="btn_dark_green"
                    />
                </div>

                <Image
                    src="menu.svg"
                    alt="menu"
                    width={32}
                    height={32}
                    className="inline-block cursor-pointer lg:hidden"
                />
            </Link>

        </nav>
    )
}

export default navbar