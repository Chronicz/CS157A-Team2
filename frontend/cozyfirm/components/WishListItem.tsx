import React, { useEffect, useState } from "react"

interface WishListItem {
    wishlist_id: number,
    furniture_name: string,
    count: number
}

interface WishListItemProps extends WishListItem {
    className?: string;
}

const WishListItem = ({ className, ...entryData }: WishListItemProps) => {
    return (
        <div className={className}>
            <p>
                WishList#{entryData.wishlist_id}
            </p>
            <div className="flex flex-row gap-5">
                <p>{entryData.furniture_name}</p>
                <p>Quantity: {entryData.count}</p>
            </div>
        </div>
    );
};

export default WishListItem;