import { useContext } from "react";
import { ConvertToCelsiusContext } from "./ConvertToCelsiusContext";

export const useConvertToCelsiusContext = () =>
  useContext(ConvertToCelsiusContext);
