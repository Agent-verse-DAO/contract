pragma solidity ^0.8.0;

import "@unlock-protocol/contracts/dist/PublicLock/IPublicLockV12.sol";
import "./SubscriptionContract.sol";

contract SubscriptionFactory {
    address[] public contracts; 
    IPublicLockV12 public lock;

    event SubscriptionContractDeployed(address indexed contractAddress, address indexed account);

    constructor(IPublicLockV12 _lockAddress) {
        lock = _lockAddress;
    }

    function deploySubscriptionContract(address _account) public returns (address) {
        SubscriptionContract subscription = new SubscriptionContract();
        subscription.transferOwnership(_account);
        contracts.push(address(subscription));
        emit SubscriptionContractDeployed(address(subscription), _account);
        return address(subscription);
    }
}