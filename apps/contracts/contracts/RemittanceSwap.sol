// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title RemittanceSwap
 * @notice Minimal on-chain remittance contract for Sarafu agent.
 *         Accepts ERC-20 stablecoin deposits and logs remittance intents.
 *         Actual Mento swaps are handled off-chain via the Mento SDK.
 *         Deployed on Celo and Status Network for hackathon tracks.
 */

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
}

contract RemittanceSwap {
    address public owner;
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

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /// @notice Record a remittance that was executed off-chain via Mento SDK
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
        totalRemittances++;
        totalVolume += amountIn;

        emit RemittanceSent(
            msg.sender, recipient, tokenIn, tokenOut,
            amountIn, amountOut, block.timestamp
        );
    }

    /// @notice Deposit tokens into the contract for the agent to use
    function deposit(address token, uint256 amount) external {
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        emit FundsDeposited(token, msg.sender, amount);
    }

    /// @notice Withdraw tokens (owner only)
    function withdraw(address token, uint256 amount) external onlyOwner {
        IERC20(token).transfer(owner, amount);
        emit FundsWithdrawn(token, owner, amount);
    }

    /// @notice Get total number of remittances processed
    function getStats() external view returns (uint256 count, uint256 volume) {
        return (totalRemittances, totalVolume);
    }

    /// @notice Get a specific remittance by index
    function getRemittance(uint256 index) external view returns (Remittance memory) {
        require(index < remittances.length, "Index out of bounds");
        return remittances[index];
    }
}
