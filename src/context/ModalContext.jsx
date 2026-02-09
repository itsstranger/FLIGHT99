import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('default'); // 'default', 'customize' etc.
    const [prefillData, setPrefillData] = useState({});

    const openModal = (type = 'default', data = {}) => {
        setModalType(type);
        setPrefillData(data);
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);

    return (
        <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, modalType, prefillData }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);
