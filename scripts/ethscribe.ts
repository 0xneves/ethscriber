import { ethers } from "hardhat";
import abi from "../artifacts/contracts/ETHScriberURI.sol/ETHScriberURI.json";

// This script is used to ethscribe a metadata to the Ethscriber Contract
async function inscribe() {
	// Get the first wallet specified in `hardhat.config.ts`
	const [signer] = await ethers.getSigners();

	// Get the global contract address
	const contractAddr = "0xD15EBb0658DC90D30A4256Da8A891B6A89f7cc4D";

	// Connect to contract
	const ETHScriberURI = new ethers.Contract(contractAddr, abi.abi, signer);

	// The contract holding the metadata information
	const metaContract = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";
	const tokenId = 1;

	// Send the transaction
	const tx = await ETHScriberURI.ethscribe(metaContract, tokenId);

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
