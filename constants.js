const port = process.env.PORT || 3002;
const LOCALHOST = process.env.LOCALHOST;
const celestia_wallet = "YOUR_CELESTIA_LIGHT_NODE_WALLET_ADDRESS_HERE";
const CELESTIA_PREFIX = "celestia";
const GAS_LIMIT = 80000;
const FEE = 2000;

module.exports = {
    port: port,
    LOCALHOST: LOCALHOST,
    celestia_wallet: celestia_wallet,
    CELESTIA_PREFIX: CELESTIA_PREFIX,
    GAS_LIMIT: GAS_LIMIT,
    FEE: FEE,
}
