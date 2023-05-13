const express = require('express');
const cors = require('cors');
const keplr = require('@keplr-wallet/cosmos')
const axios = require("axios");
const amino = require("@cosmjs/amino");
const {isEmpty} = require("lodash");
const {port, CELESTIA_PREFIX, celestia_wallet, FEE, GAS_LIMIT, PFB_URL} = require("./constants");

const app = express();
app.use(express.json());
app.use(cors());

// start the server
app.listen(port, "0.0.0.0", () => {
    console.log(`Server listening on port ${port}`);
    console.log("Your Node Wallet:", celestia_wallet)
});

app.post('/api/sendTx', (request, response) => {
    const {signature, namespaceId, data, signedMessage} = request.body;
    verifySignature(signature, namespaceId, data, signedMessage).then((result) => {
        if (result) {
            console.log("Sending...")
            axios.post(PFB_URL, JSON.stringify({
                namespace_id: namespaceId,
                data: data,
                gas_limit: GAS_LIMIT,
                fee: FEE
            }))
                .then((tx_res) => {
                    let tx_data = tx_res.data
                    console.log(tx_data)
                    response.status(200).send(tx_data)
                })
                .catch((err) => {
                    console.log(err)
                    response.status(500).send("Error happened while submitting PFB");
                });
        } else {
            response.status(401).send("You are not owner of this node!");
        }
    }).catch((err) => {
        response.status(500).send(err);
    });
});

const verifySignature = async (signature, namespaceId, data, signedMessage) => {
    const address = amino.pubkeyToAddress(signature.pub_key, CELESTIA_PREFIX);
    const {pubkey: decodedPubKey, signature: decodedSignature} = amino.decodeSignature(signature);
    let result = keplr.verifyADR36Amino(CELESTIA_PREFIX, address, signedMessage, decodedPubKey, decodedSignature);
    if (result && celestia_wallet === address && !isEmpty(namespaceId) && !isEmpty(data)) {
        console.log("Signature Verified, Ready to send Transaction!")
        return result;
    } else {
        console.log("Signature Verification Failed!")
        return false;
    }
}