// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract RemittanceSwap is Ownable {
    using SafeERC20 for IERC20;

    uint256 public totalRemittances;
    uint256 public totalVolume;

    struct Remittance {
        address sender;
        address recipient;
        address tokenIn;
        address tokenOut;
        uint256 amountIn;
        uint256 amountOut;
        uint256 timestamp;
    }

    Remittance[] public remittances;

    event RemittanceSent(
        address indexed sender,
        address indexed recipient,
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 amountOut,
        uint256 timestamp
    );

    event FundsDeposited(address indexed token, address indexed from, uint256 amount);
    event FundsWithdrawn(address indexed token, address indexed to, uint256 amount);

    constructor() Ownable(msg.sender) {}

    function recordRemittance(
        address recipient,
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 amountOut
    ) external onlyOwner {
        Remittance memory r = Remittance({
            sender: msg.sender,
            recipient: recipient,
            tokenIn: tokenIn,
            tokenOut: tokenOut,
            amountIn: amountIn,
            amountOut: amountOut,
            timestamp: block.timestamp
        });

        remittances.push(r);
        totalRemittances += 1;
        totalVolume += amountIn;

        emit RemittanceSent(
            msg.sender,
            recipient,
            tokenIn,
            tokenOut,
            amountIn,
            amountOut,
            block.timestamp
        );
    }

    function deposit(address token, uint256 amount) external {
        IERC20(token).safeTransferFrom(msg.sender, address(this), amount);
        emit FundsDeposited(token, msg.sender, amount);
    }

    function withdraw(address token, uint256 amount) external onlyOwner {
        address recipient = owner();
        IERC20(token).safeTransfer(recipient, amount);
        emit FundsWithdrawn(token, recipient, amount);
    }

    function getStats() external view returns (uint256 count, uint256 volume) {
        return (totalRemittances, totalVolume);
    }

    function getRemittance(uint256 index) external view returns (Remittance memory) {
        require(index < remittances.length, "Index out of bounds");
        return remittances[index];
    }
}
