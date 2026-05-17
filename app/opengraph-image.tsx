import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg, #05030a 0%, #160922 52%, #271052 100%)",
          color: "white",
          padding: 72,
          fontFamily: "Arial",
        }}
      >
        <div style={{ fontSize: 30, color: "#f0abfc", letterSpacing: 6 }}>CLIPFORGE AI</div>
        <div style={{ marginTop: 28, maxWidth: 920, fontSize: 82, fontWeight: 900, lineHeight: 1 }}>
          Viral YouTube Titles & Thumbnail Ideas For Creators
        </div>
        <div style={{ marginTop: 30, fontSize: 32, color: "#d4d4d8" }}>
          Titles • Thumbnail Text • Descriptions • Hashtags • Pinned Comments
        </div>
      </div>
    ),
    size,
  );
}
