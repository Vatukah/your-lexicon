// context/ModalContext.js
import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);

  const showModal = (content) => {

    const body = document.querySelector('body');
    body.style.overflow = 'hidden';
    setModalContent(content);
  };
  const closeModal = () => {
    const body = document.querySelector('body');
    body.style.overflow = 'auto';
    setModalContent(null);
  };

  const handleBubblingEvent = (event) => {
    event.stopPropagation(); // Prevent the event from bubbling up to the modal background
    
  };

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      {modalContent && (
        <div className="fixed inset-0 bg-gray-400/50 backdrop-blur-xs flex items-center justify-center z-50" onClick={closeModal}>
          <div className="bg-white rounded-xl shadow-lg p-1 relative w-full h-dvh max-w-[800px] lg:w-1/2 lg:h-3/4" onClick={handleBubblingEvent}>
           
            {modalContent}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
