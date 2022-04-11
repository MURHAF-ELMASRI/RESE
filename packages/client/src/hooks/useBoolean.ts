import { useCallback, useState } from "react";

export default function useBoolean(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return [isOpen, handleOpen, handleClose] as const;
}
