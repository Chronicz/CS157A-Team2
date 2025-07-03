"use client";

import React from 'react';
import Link from "next/link";
import Image from "next/image";
import Button from "../components/buttons"; // Assuming this is your custom Button component
import { NAV_LINKS } from "../constants"; // Your navigation links constant
import { useAuth } from "../context/AuthContext"; // <--- Import your useAuth hook
import { useRouter } from "next/navigation"; // <--- Import useRouter for redirection on logout

const Navbar = () => {
    // Destructure the needed state and functions from your AuthContext
    const { isLoggedIn, username, logout } = useAuth();
    const router = useRouter(); // Initialize the router

    const handleLogout = () => {
        logout(); // Call the logout function from your AuthContext
        router.push('/login'); // Redirect to the login page after logging out
    };

    return (
        <nav className="border-2 flexBetween max-container padding-container relative z-30 py-5 min-h-[10vh]">
            <Link href="/" className="font-bold">
                COZYFIRM
            </Link>

            <ul className="hidden h-full gap-12 lg:flex">
                {NAV_LINKS.map((link) => (
                    // Optionally, you can make some NAV_LINKS conditional based on isLoggedIn
                    // For example, only show "Wishlist" if logged in.
                    <Link href={link.href} key={link.key} className="font-bold flexCenter cursor-pointer pb-1.5 transition-all hover:font-extrabold">
                        {link.label}
                    </Link>
                ))}
            </ul>

            {/* Conditional rendering based on login status */}
            <div className="lg:flexCenter hidden">
                {isLoggedIn ? (
                    // Display "Hello {username}" and a Logout button
                    <div className="flex items-center"> {/* Use flex to align items if needed */}
                        <span className="mr-4 text-gray-700">Hello, {username}!</span> {/* Use a text color that fits your design */}
                        {/* Optionally add a link to a user dashboard/profile here */}
                        <Button
                            type="button"
                            title="Logout"
                            variant="btn_dark_green" // Or a red/warning variant if you have one
                            onClick={handleLogout} // Assign the handleLogout function to onClick
                        />
                    </div>
                ) : (
                    // Display the Login button when not logged in
                    <Link href="/login">
                        <Button
                            type="button"
                            title="Login"
                            variant="btn_dark_green"
                        />
                    </Link>
                )}
            </div>

            {/* Mobile menu icon (assuming this is for mobile menu toggle) */}
            <Image
                src="menu.svg"
                alt="menu"
                width={32}
                height={32}
                className="inline-block cursor-pointer lg:hidden"
            // You might also need an onClick handler here to toggle a mobile menu
            />
        </nav>
    );
};

export default Navbar;