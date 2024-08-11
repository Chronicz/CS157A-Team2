"use client";

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

interface admin {
    user_id: number;
    first_name: string;
    last_name: string;
}

const Browse = () => {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const res = await axios.get("http://localhost:8000/contact");
                setAdmins(res.data);
                console.log(res);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAdmins();
    }, []);

    return (
        <div>
            <div className="flexCenter pt-20 pb-5 bold-32 flex-col">
                About Us
            </div>
            <div className="relative h-full overflow-y-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="py-3 px-6">first_name</th>
                            <th className="py-3 px-6">last_name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((ad: admin) => (
                            <tr
                                key={ad.user_id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <td className="py-4 px-6">{ad.first_name}</td>
                                <td className="py-4 px-6">{ad.last_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Browse;
