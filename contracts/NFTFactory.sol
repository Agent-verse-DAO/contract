pragma solidity ^0.8.0;

import "./CustomNFT.sol";

contract NFTFactory {
    event NFTDeployed(address indexed creator, address indexed nftContract);

    function deployNFT(
        string memory name,
        string memory symbol,
        string memory description
    ) external returns (address) {
        CustomNFT nftContract = new CustomNFT(
            msg.sender,
            name,
            symbol,
            description
        );

        emit NFTDeployed(msg.sender, address(nftContract));

        return address(nftContract);
    }
}
