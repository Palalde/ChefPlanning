import { Dispatch, Reducer } from "react";
import useLocalStorage from "./useLocalStorage";

/**
 * combines useReducer with useLocalStorage to manage state in localStorage.
 *
 * @param key localStorage key
 * @param reducer
 * @param initialValue
 * @returns [state, dispatch] tuple of an classic useReducer
 */
export default function useLocalReducer<T, A>(
  key: string,
  reducer: Reducer<T, A>,
  initialValue: T,
): [T, Dispatch<A>] {
  const [state, setState] = useLocalStorage(key, initialValue);

  const dispatch: Dispatch<A> = (action) =>
    setState((prev) => reducer(prev, action));

  return [state, dispatch];
}
