import React, { useState, useEffect } from "react";

export default function SimpleSplitPane() {
  const [leftWidth, setLeftWidth] = useState(300);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setLeftWidth(e.clientX); // key idea
    };

    const handleUp = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [isDragging]);

  return (
    <div style={{ display: "flex", height: "300px" }}>
      {/* LEFT */}
      <div style={{ width: leftWidth, background: "#f3f4f6" }}>
        Left
      </div>

      {/* DIVIDER */}
      <div
        style={{
          width: "5px",
          cursor: "col-resize",
          background: "gray",
        }}
        onMouseDown={() => setIsDragging(true)}
      />

      {/* RIGHT */}
      <div style={{ flex: 1, background: "#e5e7eb" }}>
        Right
      </div>
    </div>
  );
}
