async function toHex(value: string): Promise<Buffer> {
	const hexed = Buffer.from(value);
	console.log("\nAs string", value);
	console.log("As Hex: 0x" + hexed.toString("hex"));
	console.log("As Buffer: ", hexed, "\n");
	return hexed;
}

const data = "thescriptions.eth";

toHex(data);
