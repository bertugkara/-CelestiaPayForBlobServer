const port = process.env.PORT || 3002;
const celestia_wallet = process.env.WALLET_ADDRESS; // go to your terminal and type
// "export WALLET_ADDRESS=<the imported celestia address on your node which you will spend your PFB fees.>"
const CELESTIA_PREFIX = "celestia";
const GAS_LIMIT = 80000;
const FEE = 2000;
const PFB_URL = `http://localhost:26659/submit_pfb`

module.exports = {
    port: port,
    celestia_wallet: celestia_wallet,
    CELESTIA_PREFIX: CELESTIA_PREFIX,
    GAS_LIMIT: GAS_LIMIT,
    FEE: FEE,
    PFB_URL: PFB_URL
};