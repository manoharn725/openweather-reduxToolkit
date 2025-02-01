import { useContext } from "react";
import UnixToLocalTimeContext  from "./UnixToLocalTimeContext";

export const useUnixToLocalTimeContext = () =>
  useContext(UnixToLocalTimeContext);
