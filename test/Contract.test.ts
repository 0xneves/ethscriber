import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

// This is a test suite
describe("Ethscriber", async function () {
	// Will save contract instance to preserve context
	let Ethscriber: Contract;

	// Will save the deployer address to preserve context
	let owner: SignerWithAddress;

	before(async () => {
		// Get the first wallet specified in `hardhat.config.ts`
		const [signer] = await ethers.getSigners();
		owner = signer;

		// Generate artifacts from the contract and prepare it for deployment
		const Factory = await ethers.getContractFactory("Ethscriber", signer);

		// Deploy the contract
		const Contract = await Factory.deploy();

		// Wait for the transaction to be mined
		Ethscriber = await Contract.deployed();

		// Log the deployer address and the contract address
		console.log("\nDeployer:\n", owner.address);
	});

	it("Should create Ethscription", async function () {
		// Set the metadata to be inscribed
		const metadata = "thescriptions.eth";

		// Send the transaction
		await expect(
			owner.sendTransaction({
				to: Ethscriber.address,
				value: ethers.utils.parseEther("0"),
				data: Buffer.from(metadata),
			})
			// Expect the transaction to be successful
		).to.not.be.reverted;
	});

	it("Should fail in case of sending ETH and no data", async function () {
		// Set the empty metadata to be inscribed
		const metadata = "";

		// Send the transaction with value
		await expect(
			owner.sendTransaction({
				to: Ethscriber.address,
				value: ethers.utils.parseEther("0.0000001"),
				data: Buffer.from(metadata),
			})
			// Expect the transaction to be reverted warning about empty data field
		).to.be.revertedWithCustomError(Ethscriber, "EmptyDataField");
	});
});
