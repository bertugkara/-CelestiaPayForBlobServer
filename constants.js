const port = process.env.PORT || 3002;
const LOCALHOST = process.env.LOCALHOST;
const celestia_wallet = "celestia1p20jz5tc50agrlr8ud5f87r83k23t2l8axvt34";
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
