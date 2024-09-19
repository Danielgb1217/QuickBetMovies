"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface GlobalContextProps {
    isModalOpen: boolean;
    toggleModal: () => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (status: boolean) => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    return (
        <GlobalContext.Provider
            value={{ isModalOpen, toggleModal, isLoggedIn, setIsLoggedIn }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
};
