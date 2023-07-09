import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

// Mainnets
const { ETH, BNB, MATIC, AVAX, FANTOM } = process.env;

// Testnets
const { SEPOLIA, MUMBAI } = process.env;

// Private Keys
const { PKEY_DEPLOYER, PKEY_TESTER } = process.env;

// Scans
const { SCAN } = process.env;

const config: HardhatUserConfig = {
	solidity: "0.8.19",
	defaultNetwork: "hardhat",
	/**
	 * @notice Block Scanner
	 * @dev This is used to verify the contract on Etherscan
	 * Switch the apiKey in the .env as there is no support for
	 * network specification in the hardhat.config.ts
	 */
	etherscan: {
		apiKey: `${SCAN}`,
	},
	mocha: {
		timeout: 2000000,
	},
	networks: {
		/**
		 * @notice Localhost
		 */
		localhost: {
			url: "http://127.0.0.1:8545",
		},
		/**
		 * @notice Mainnets
		 */
		ethereum: {
			url: `${ETH}`,
			accounts: [`${PKEY_DEPLOYER}`],
		},
		binance: {
			url: `${BNB}`,
			accounts: [`${PKEY_DEPLOYER}`],
		},
		polygon: {
			url: `${MATIC}`,
			accounts: [`${PKEY_DEPLOYER}`],
		},
		avalanche: {
			url: `${AVAX}`,
			accounts: [`${PKEY_DEPLOYER}`],
		},
		fantom: {
			url: `${FANTOM}`,
			accounts: [`${PKEY_DEPLOYER}`],
		},
		/**
		 * @notice Testnets
		 */
		sepolia: {
			url: `${SEPOLIA}`,
			accounts: [`${PKEY_TESTER}`],
		},
		mumbai: {
			url: `${MUMBAI}`,
			accounts: [`${PKEY_TESTER}`],
		},
	},
};

export default config;
