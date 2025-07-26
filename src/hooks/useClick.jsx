import { useRef } from "react";
import { useFocus } from "../context/useFocus";

export function useClick() {
  const clickCount = useRef(0);
  const clickTimeout = useRef(null);
  const { setFocused } = useFocus();

  function handleClick({ id = null, namespace, doubleClick }) {
    if (!id) setFocused({ namespace: namespace, id: null });

    let timeout = 150;
    clickCount.current++;

    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
    }

    clickTimeout.current = setTimeout(() => {
      if (clickCount.current === 1) {
        setFocused({ namespace: namespace, id: id });
      } else if (clickCount.current === 2) {
        doubleClick();
      }
      clickCount.current = 0;
      clickTimeout.current = null;
    }, timeout);
  }

  return handleClick;
}
