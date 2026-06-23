export type Hex = `0x${string}`;

export const truncateHex = (hex: Hex) => `${hex.slice(0, 4)}…${hex.slice(-4)}`;

export const addrShort = truncateHex;
