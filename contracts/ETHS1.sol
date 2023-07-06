// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

error EmptyDataField();
error InvalidFunctionCall(bytes response);
error NonExistantContractOrToken(address addr, uint256 tokenId);
error NotEnoughETHProvided(uint256 value);

interface ITokenURI {
    function tokenURI(uint256 tokenId) external view returns (string memory);
}

contract ETHS1 {
    // Global address of the Ethscriber contract
    address public constant ETHSCRIBER =
        0xD15EBb0658DC90D30A4256Da8A891B6A89f7cc4D;

    // Price of the Inscription
    uint256 public constant price = 0.001 ether;

    // Owner of the contract
    address public immutable owner;

    // Constructor
    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev This function is used to ethscribe NFTs from contracts that implement the
     * `tokenURI(uint256)` function, which is part of the ERC721 standard.
     * @param _addr The address of the contract that holds the desired NFT.
     * @param _tokenId The ID of the NFT to be ethscribed.
     */
    function ethscribe(address _addr, uint256 _tokenId) public payable {
        try ITokenURI(_addr).tokenURI(_tokenId) returns (
            string memory tokenURI
        ) {
            _ethscribe(tokenURI);
        } catch {
            revert NonExistantContractOrToken(_addr, _tokenId);
        }
    }

    /**
     * @dev This function is used to ethscribe by calling the Ethscriber
     * contract directly.
     * @param _tokenURI - The token URI of the NFT to be ethscribed.
     */
    function _ethscribe(string memory _tokenURI) internal {
        (bool sent, bytes memory response) = address(ETHSCRIBER).delegatecall(
            bytes(_tokenURI)
        );
        if (!sent) revert InvalidFunctionCall(response);

        if (msg.value < price) revert NotEnoughETHProvided(msg.value);
    }

    function withdraw() public {
        address(owner).call{value: address(this).balance}("");
    }

    /**
     * @dev - The receive function will revert any attemps of sending ETH
     * to the contract with an empty `msg.data` field.
     *
     * Requirements:
     * - The `msg.value` field must be larger than 0.
     * - The `msg.data` field must be empty.
     */
    receive() external payable {
        revert EmptyDataField();
    }
}
