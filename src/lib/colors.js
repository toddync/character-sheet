export default [
    "#fb2c36",
    "#ff6900",
    "#fe9a00",
    "#f0b100",
    "#7ccf00",
    "#00c951",
    "#00bc7d",
    "#00bba7",
    "#00b8db",
    "#00a6f4",
    "#2b7fff",
    "#615fff",
    "#8e51ff",
    "#ad46ff",
    "#e12afb",
    "#f6339a",
    "#ff2056"
];

export function hexToRgba(hex = "", opacity = 1) {
    // Strip leading hash if present
    let cleaned = hex.replace(/^#/, "");

    // Handle 3‑digit shorthand ("f05" → "ff0055")
    if (cleaned.length === 3) {
        cleaned = cleaned
            .split("")
            .map((ch) => ch + ch)
            .join("");
    }

    if (cleaned.length !== 6 || Number.isNaN(Number.parseInt(cleaned, 16))) {
        throw new Error(`Invalid hex color: "${hex}"`);
    }

    // Parse the R, G, B components
    const r = Number.parseInt(cleaned.substr(0, 2), 16);
    const g = Number.parseInt(cleaned.substr(2, 2), 16);
    const b = Number.parseInt(cleaned.substr(4, 2), 16);

    // Clamp opacity to [0,1]
    const a = Math.max(0, Math.min(1, opacity));

    return `rgba(${r}, ${g}, ${b}, ${a})`;
}
