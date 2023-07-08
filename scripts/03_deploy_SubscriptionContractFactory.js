const hre = require("hardhat");

async function main() {

    const lockAddress = "0x09A8F16Ed16C28f4774aBF73eCc071cfB423Ac24";
    const SubscriptionFactory = await ethers.getContractFactory("SubscriptionFactory");
    const subscriptionFactory = await SubscriptionFactory.deploy(lockAddress);
    await subscriptionFactory.deployed();
    

    console.log("SubscriptionFactory deployed to:", subscriptionFactory.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
