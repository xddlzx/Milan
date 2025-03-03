// routes/contractRoute.js
const express = require("express");
const ethers = require("ethers");
const myContractABI = require("/Users/dilayecemaral/Desktop/spring25/milan2/artecommerce/build/contracts/MyContract.json").abi;
// Adjust path as needed
const router = express.Router();
const { JsonRpcProvider } = require("ethers");

const provider = new JsonRpcProvider("http://127.0.0.1:8545");
// Contract Address (from your Truffle migration)

const contractAddress = "0x7e6B56a6fa7957465faDb0902f14eB37682Dc640";
console.log("contractRoute.js loaded");

router.get("/contract-info", async (req, res) => {
    try {
        console.log("contract-info route hit");
        const contract = new ethers.Contract(
            contractAddress,
            myContractABI,
            provider
        );
        console.log("Contract instance created");
        const number = await contract.getNumber();
        console.log("Number fetched:", number);
        const string = await contract.getString();
        console.log("String fetched:", string);
        const result = {
            number: number.toString(),
            string: string,
        };
        console.log("Contract Info:", result);
        res.json(result);
    } catch (error) {
        console.error("Error fetching contract info:", error);
        console.error("Error details:", error.message, error.stack);
        res.status(500).json({ error: "Failed to fetch contract info" });
    }
});

router.get("/test", (req, res) => {
    console.log("Test route hit");
    res.send("Test route working");
});

module.exports = router;