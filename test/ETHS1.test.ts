import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

// This is a test suite
describe("Ethscriber", async function () {
	// Will save contract instance to preserve context
	let ETHScriberURI: Contract;
	let MOCK721: Contract;

	// Will save the deployer address to preserve context
	let owner: SignerWithAddress;

	before(async () => {
		// Get the first wallet specified in `hardhat.config.ts`
		const [signer] = await ethers.getSigners();
		owner = signer;

		// Generate artifacts from the contract and prepare it for deployment
		const Factory = await ethers.getContractFactory("ETHScriberURI", signer);
		const FactoryMock = await ethers.getContractFactory("MOCK721", signer);

		// Deploy the contract
		const Contract = await Factory.deploy();
		const ContractMock = await FactoryMock.deploy();

		// Wait for the transaction to be mined
		ETHScriberURI = await Contract.deployed();
		MOCK721 = await ContractMock.deployed();

		// Log the deployer address and the contract address
		console.log("\nDeployer:\n", owner.address);
	});

	it("Should create Ethscription using existing URI", async function () {
		await MOCK721.mint(owner.address, 1);
		// Send the transaction
		const price = ethers.utils.parseEther("0.001");
		const tx = await ETHScriberURI.ethscribe(MOCK721.address, 1, { value: price });

		// Wait for the transaction to be mined
		await tx.wait();
		console.log(tx.hash);
	});
});
