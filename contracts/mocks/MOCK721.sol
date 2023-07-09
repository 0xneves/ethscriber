// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

error NonExistanOrToken(uint256 tokenId);
using Strings for uint256;

contract MOCK721 is ERC721 {
    constructor() ERC721("Mock", "MOCK") {}

    function mint(address _to, uint256 _tokenId) public {
        _mint(_to, _tokenId);
    }

    /**
     * @dev Returns the token URI for a given token ID
     * @param _tokenId The token ID to return the URI for
     * @return The token URI for the given token ID
     */
    function tokenURI(
        uint256 _tokenId
    ) public view override returns (string memory) {
        if (!_exists(_tokenId)) {
            revert NonExistanOrToken(_tokenId);
        }

        string memory currBaseURI = _baseURI();
        return
            bytes(currBaseURI).length > 0
                ? string(abi.encodePacked(currBaseURI, _tokenId.toString()))
                : "";
    }

    /**
     * @dev Overrides the the original baseURI to return what is set in the contract
     * @return The base URI for all tokens
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/";
    }
}
