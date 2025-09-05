import React, { useEffect, useState } from "react";

function KeyboardGuard({ children }) {
  const [hasKeyboard, setHasKeyboard] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Detect if device is touch-only (mobile/tablet)
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      setChecked(true);
      setHasKeyboard(false);
      return;
    }

    // Wait for actual key press
    const handleKeyDown = () => {
      setHasKeyboard(true);
      setChecked(true);
      window.removeEventListener("keydown", handleKeyDown);
    };

    window.addEventListener("keydown", handleKeyDown);

    // Give up after 5 seconds if no keyboard detected
    const timer = setTimeout(() => {
      setChecked(true);
    }, 5000);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, []);

  if (!checked) {
    return <h2 className="text-center mt-10">Checking for keyboard Click any key ⌨️...</h2>;
  }

  if (!hasKeyboard) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-2xl font-bold">Keyboard Required 🚫</h1>
        <p className="mt-2">Please open this typing test on a system with a physical keyboard.</p>
      </div>
    );
  }

  return <>{children}</>;
}

export default KeyboardGuard;
