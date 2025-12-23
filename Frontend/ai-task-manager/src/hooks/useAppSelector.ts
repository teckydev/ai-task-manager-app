import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

// ✅ simple, readable, works
export const useAppSelector = <T>(
  selector: (state: RootState) => T
): T => useSelector(selector);
