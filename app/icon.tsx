import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#07111f",
        border: "2px solid #2563eb",
        borderRadius: "14px",
        color: "#ffffff",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        letterSpacing: "-4px",
        paddingRight: "4px",
        position: "relative",
        width: "100%",
      }}
    >
      <span style={{ fontSize: 31, fontWeight: 800, lineHeight: 1 }}>PM</span>
      <span
        style={{
          background: "#3b82f6",
          borderRadius: "999px",
          bottom: "8px",
          display: "flex",
          height: "3px",
          left: "15px",
          position: "absolute",
          width: "34px",
        }}
      />
    </div>,
    size,
  );
}
