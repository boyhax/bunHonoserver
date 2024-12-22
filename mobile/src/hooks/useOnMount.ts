import { useEffect, useRef } from "react";

export default function (callback: () => void) {
  const finishfirst = useRef(false);
  useEffect(() => {
    if (finishfirst.current == true) {
      callback();
    }

    return () => {
      finishfirst.current = true;
    };
  }, []);
  return {};
}
