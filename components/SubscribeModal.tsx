"use client";

import { Price, ProductWithPrice } from "@/types";

import { useState } from "react";
import { useUser } from "@/hooks/useUser";

import Modal from "./Modal";
import Button from "./Button";
import toast from "react-hot-toast";
import { postData } from "@/libs/helpers";
import { getStripe } from "@/libs/stripeClient";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import useTransactionModal from "@/hooks/useTransactionModal";
import useAuthModal from "@/hooks/useAuthModal";
interface SubscribeModalProps {
    products: ProductWithPrice[];
}

const formatPrice = (price: Price) => {
    const priceString = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: price.currency,
        minimumFractionDigits: 0
    }).format((price?.unit_amount || 0));

    return priceString;
}

const SubscribeModal: React.FC<SubscribeModalProps> = ({
    products
}) => {

    const subscribeModal = useSubscribeModal();
    const transactionModal = useTransactionModal();
    const authModal = useAuthModal();
    const { user, isLoading, subscription } = useUser();
    const [priceIdLoading, setPriceIdLoading] = useState<string>();

    const onChange = (open: boolean) => {
        if (!open) {
            subscribeModal.onClose();
        }
    }

    const handleCheckout = async (price: Price) => {
        setPriceIdLoading(price.id);

        if (!user) {
            setPriceIdLoading(undefined);
            return toast.error('Must be logged in');
        }

        if (subscription) {
            setPriceIdLoading(undefined);
            return toast.error('Already subscribed');
        }

        authModal.onOpen();
    };

    let content = (
        <div className="text-center">
            No products available.
        </div>
    );

    if (products.length) {
        content = (
            <div>
                {products.map((product) => {
                    if (!product.prices?.length) {
                        return (
                            <div key={product.id}>
                                No prices available.
                            </div>
                        )
                    }

                    return product.prices.map((price) => (
                        <Button 
                            key={price.id}
                            onClick={() => handleCheckout(price)}
                            disabled={isLoading || price.id === priceIdLoading}
                            className="mb-4"
                        >
                            {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
                        </Button>
                    ))
                })}
            </div>
        )
    }

    if (subscription) {
        content = (
            <div className="text-center">
                Already subsrcibed
            </div>
        )
    }

    return (
        <Modal
            title="Only for Premium users"
            description="Listen to music with Spotify Premium"
            isOpen={subscribeModal.isOpen}
            onChange={onChange}
        >
            {content}
        </Modal>
    );
}

export default SubscribeModal;