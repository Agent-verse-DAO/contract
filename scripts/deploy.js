const hre = require("hardhat");
const { ethers } = require('hardhat');

async function main() {
    const [deployer, account2] = await hre.ethers.getSigners();
    console.log("deployer: ", deployer.address);

    const RegistryAddress = "0x193961D0c89a567ddc2Fa88623397e502e68c1C2";
    const ERC6551AccountAddress = "0x81f80919874Ad90D34E521f76D4F09D7C0Be138A";

    const Registry = await hre.ethers.getContractAt("ERC6551Registry", RegistryAddress);
    const ERC6551Account = await hre.ethers.getContractAt("ERC6551Account", ERC6551AccountAddress);

    const NFTAddress = "0x2Fd5B9A60D80616F9Ea850dE5D170C3B92E5630b";
    const tokenId = 1; 

    console.log("create TokenBoundAccount");

    const newAccount = await Registry.callStatic.createAccount(
        ERC6551Account.address, 
        5, // Goerli chainId 
        NFTAddress, 
        tokenId, // token ID
        1, // salt
        "0x" // init calldata
    );
    console.log("TokenBoundAccount address:", newAccount);

    console.log("Transferring 0.001 eth to TokenBoundAccount address");

    const sendEth = await deployer.sendTransaction({
        to: newAccount,
        value: ethers.utils.parseEther("0.001")
    });

    const balance = await ethers.provider.getBalance(newAccount);
    console.log("TokenBoundAccount balance:", balance.toString());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
