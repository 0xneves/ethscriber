import { ethers } from "hardhat";

// This script is used to deploy the Ethscriber Contract
async function deploy() {
	// Get the first wallet specified in `hardhat.config.ts`
	const [signer] = await ethers.getSigners();

	// Generate artifacts from the contract and prepare it for deployment
	const Factory = await ethers.getContractFactory("Ethscriber", signer);

	// Deploy the contract
	const Contract = await Factory.deploy();

	// Wait for the transaction to be mined
	const Ethscriber = await Contract.deployed();

	// Log the deployer address and the contract address
	console.log("\nDeployer:\n", signer.address);
	console.log("\nContract addr:\n", Ethscriber.address);
}

deploy()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
