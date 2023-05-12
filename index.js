const express = require('express');
const cors = require('cors');
const keplr = require('@keplr-wallet/cosmos')
const axios = require("axios");
const amino = require("@cosmjs/amino");
const {isEmpty} = require("lodash");
const {port, CELESTIA_PREFIX, celestia_wallet, FEE, GAS_LIMIT, LOCALHOST} = require("./constants");

const app = express();
app.use(express.json());
app.use(cors());

// start the server
app.listen(port, "0.0.0.0", () => {
    console.log(`Server listening on port ${port}`);
});

app.post('/sendTx', (request, response) => {
    const {signature, namespaceId, data, signedMessage} = request.body;
    verifySignature(signature, namespaceId, data, signedMessage).then((result) => {
        if (result) {
            axios.post(`${LOCALHOST}:26659/submit_pfb`, {
                namespaceId, data, GAS_LIMIT, FEE
            }).then(async (tx_res) => {
                let tx_data = await tx_res.data
                response.status(200).send(tx_data)
            }).catch((err) => {
                console.log(err)
                response.status(500).send("Error in submitting PFB");
            });
        }
    }).catch((err) => {
        response.status(404).send(err);
    });
});

const verifySignature = async (signature, namespaceId, data, signedMessage) => {
    try {
        const address = amino.pubkeyToAddress(signature.pub_key, CELESTIA_PREFIX);
        console.log(address)
        const {pubkey: decodedPubKey, signature: decodedSignature} = amino.decodeSignature(signature);
        let result = keplr.verifyADR36Amino(CELESTIA_PREFIX, address, signedMessage, decodedPubKey, decodedSignature);
        console.log(result)
        if (result && celestia_wallet === address && !isEmpty(namespaceId) && !isEmpty(data)) {
            console.log("Signature Verified, Ready to send Transaction!")
            return result;
        }
    } catch (error) {
        console.log(error)
        return false;
    }

}