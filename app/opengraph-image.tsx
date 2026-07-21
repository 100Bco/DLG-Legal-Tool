import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Required for `output: export` — render the OG image to a static PNG at build.
export const dynamic = "force-static";

// Branded default social-share image, generated as a static PNG at build time.
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1e2b63 0%, #2f3f8f 100%)",
          color: "white",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 30, opacity: 0.85, letterSpacing: 2 }}>
          BY DANG LAW GROUP
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 800,
            marginTop: 24,
            lineHeight: 1.05,
          }}
        >
          {site.name}
        </div>
        <div style={{ fontSize: 40, marginTop: 24, opacity: 0.95 }}>
          Free Texas personal-injury legal tools
        </div>
        <div
          style={{
            display: "flex",
            gap: 20,
            marginTop: 48,
            fontSize: 26,
            opacity: 0.9,
          }}
        >
          <div
            style={{
              border: "2px solid rgba(255,255,255,0.5)",
              borderRadius: 12,
              padding: "10px 22px",
            }}
          >
            Statute of Limitations
          </div>
          <div
            style={{
              border: "2px solid rgba(255,255,255,0.5)",
              borderRadius: 12,
              padding: "10px 22px",
            }}
          >
            Settlement Estimate
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
