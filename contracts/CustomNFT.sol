pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CustomNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    event NFTCreated(address creator, uint256 tokenId);

    address public creator;
    bool public hasMinted;

    constructor(
        address _creator,
        string memory name,
        string memory symbol,
        string memory description
    ) ERC721(name, symbol) {
        creator = _creator;
        _createNFT(description);
    }

    function _createNFT(string memory description) internal {
        require(!hasMinted, "The creator has already minted the NFT");

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(creator, newItemId);

        // Set metadata
        string memory metadata = string(
            abi.encodePacked(
                "{",
                '"description": "',
                description,
                '", ',
                '"attributes": []',
                "}"
            )
        );
        _setTokenURI(newItemId, metadata);

        // Emit event
        emit NFTCreated(creator, newItemId);

        hasMinted = true;
    }

    function withdraw() external {
        require(
            msg.sender == creator,
            "You are not the creator of the contract"
        );
        payable(creator).transfer(address(this).balance);
    }
}
