import { ethers } from "hardhat";

// This script is used to ethscribe a metadata to the Ethscriber Contract
async function inscribe() {
	// Get the first wallet specified in `hardhat.config.ts`
	const [signer] = await ethers.getSigners();

	// Get the global contract address
	const contractAddr = "CONTRACT_ADDRESS";

	// Set the metadata to be inscribed
	const metadata = "thescriptions.eth";

	// Send the transaction
	const tx = await signer.sendTransaction({
		to: contractAddr,
		value: ethers.utils.parseEther("0"),
		data: Buffer.from(metadata),
	});

	// Wait for the transaction to be mined
	await tx.wait();

	// Log the transaction hash
	console.log("\nTx:\n", tx.hash);
}

inscribe()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
