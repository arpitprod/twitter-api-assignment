import { createContext } from "react";

export const HistoryContext = createContext(null);

export const HistoryProvider = HistoryContext.Provider
export const HistoryConsumer = HistoryContext.Consumer
export default HistoryContext;
