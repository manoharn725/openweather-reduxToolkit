import { useContext } from "react";
import { GetCurrentDayContext } from "./GetCurrentDayContext";

export const useGetCurrentDayContext = () => {
    return useContext(GetCurrentDayContext)
}