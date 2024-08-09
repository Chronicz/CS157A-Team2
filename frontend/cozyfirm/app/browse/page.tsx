"use client";

import React from "react";
import { useEffect, useState, ChangeEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

interface Furniture {
    furniture_id: number;
    furniture_name: string;
    brand: string;
    description: string;
    length: number;
    height: number;
    width: number;
    price: number;
    material: string;
    color: string;
}

interface iDefault {

    defaultValue: string | null
}
const Browse = ({ defaultValue }: iDefault) => {
    const router = useRouter()

    // We need to grab the current search parameters and use it as default value for the search input
    const [inputValue, setValue] = useState(defaultValue)
    const [furnitures, setFurnitures] = useState([]);


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setValue(inputValue);
    }

    // If the user clicks enter on the keyboard, the input value should be submitted for search 
    // We are now routing the search results to another page but still on the same page
    const handleSearch = () => {
        if (inputValue) {
            axios
                .get("http://localhost:8000/browse", {
                    params: { furniture_name: inputValue },
                })
                .then((res) => {
                    setFurnitures(res.data);
                })
                .catch((err) => console.log(err));
        } else {
            // If the search input is empty, fetch all the furniture items
            axios
                .get("http://localhost:8000/browse")
                .then((res) => setFurnitures(res.data))
                .catch((err) => console.log(err));
        }
    };

    const handleKeyPress = (event: { key: any; }) => {
        if (event.key === "Enter") return handleSearch()
    }

    useEffect(() => {
        const fetchFurnitures = async () => {
            try {
                const res = await axios.get("http://localhost:8000/browse");
                setFurnitures(res.data);
                console.log(res);
            } catch (err) {
                console.log(err);
            }
        };
        fetchFurnitures();
    }, []);


    return (
        <div>
            <div className='max-w-md mx-auto my-10'>
                <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                    <div className="grid place-items-center h-full w-12 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <input
                        className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                        type="text"
                        id="search"
                        value={inputValue ?? ""} onChange={handleChange}
                        onKeyDown={handleKeyPress}
                        placeholder="Search something..." />
                </div>
            </div>
            <div className="relative h-full overflow-y-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="py-3 px-6">Furnitures</th>
                            <th className="py-3 px-6">Brand</th>
                            <th className="py-3 px-6">Description</th>
                            <th className="py-3 px-6">Material</th>
                            <th className="py-3 px-6">Color</th>
                            <th className="py-3 px-6">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {furnitures.map((furn: Furniture) => (
                            <tr
                                key={furn.furniture_id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <td className="py-4 px-6">{furn.furniture_name}</td>
                                <td className="py-4 px-6">{furn.brand}</td>
                                <td className="py-4 px-6">{furn.description}</td>
                                <td className="py-4 px-6">{furn.material}</td>
                                <td className="py-4 px-6">{furn.color}</td>
                                <td className="py-4 px-6">{furn.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Browse;
