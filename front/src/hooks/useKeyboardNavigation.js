import { useEffect } from "react";

const useKeyboardNavigation = (handlePlayerOption, handleReset, handleOpen, handleClose) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'a' || e.key === 'A') {
        handlePlayerOption(0);
      } else if (e.key === 'z' || e.key === 'Z') {
        handlePlayerOption(1);
      } else if (e.key === 'e' || e.key === 'E') {
        handlePlayerOption(2);
      } else if (e.key === 'r' || e.key === 'R') {
        handleReset();
      } else if (e.key === 'o' || e.key === '0') {
        handleOpen();
      } else if (e.key === 'c' || e.key === 'C') {
        handleClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listenir
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlePlayerOption, handleReset, handleOpen, handleClose]);
}
export default useKeyboardNavigation;
