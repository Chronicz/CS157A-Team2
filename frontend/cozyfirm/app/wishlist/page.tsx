"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import WishListItem from "../../components/WishListItem";


const WishListPage = () => {
    const { isLoggedIn, userId, token } = useAuth();
    const router = useRouter();
    const [wishlistItems, setWishlistItems] = useState<WishListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login');
            return;
        }

        if (!userId || !token) {
            setError("User information not available. Please log in again.")
            setLoading(false);
            return;
        }

        const fetchWishList = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await axios.get("http://localhost:8000/wishlist", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the JWT here
                    },
                });

                setWishlistItems(res.data)

            } catch (err: any) {
                console.error("Failed to fetch wishlist:", err);
                if (err.response && err.response.status === 401) {
                    setError("Your session has expired. Please log in again.");
                    // Optionally, automatically log out the user if token is truly expired/invalid
                    // logout();
                    // router.push('/login');
                } else {
                    setError("Error loading wishlist items. Please try again later.");
                }
            } finally {
                setLoading(false); // Set loading to false regardless of success or error
            }
        };
        fetchWishList();
    }, [isLoggedIn, userId, token, router]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading your wishlist...</p>
            </div>
        );
    }
};
export default WishListPage;