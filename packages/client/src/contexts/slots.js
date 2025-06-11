import React, { createContext, useContext, useState } from "react";

const SlotContext = createContext({});

export const SlotProvider = ({ children }) => {
  const [slots, setSlots] = useState({});

  const registerSlot = (name, component) => {
    setSlots((prev) => ({
      ...prev,
      [name]: [...(prev[name] || []), component],
    }));
  };

  return (
    <SlotContext.Provider value={{ slots, registerSlot }}>
      {children}
    </SlotContext.Provider>
  );
};

export const useSlot = (name) => {
  const { slots } = useContext(SlotContext);
  return slots[name] || [];
};

export const useRegisterSlot = () => {
  const { registerSlot } = useContext(SlotContext);
  return registerSlot;
};
