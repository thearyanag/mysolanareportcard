const axios = require('axios');
const getOnchainData = require('../../functions/getOnchainData');

export default async function handler(req, res) {

    const { receiverAddress } = req.query;

    if (receiverAddress == undefined) {
        res.status(400).json({ error: 'Missing receiverAddress' });
        return;
    }

    let degenData = await getOnchainData(receiverAddress);

    console.log(degenData);

    let imageId = degenData.status;

    const token = process.env.UNDERDOG_PROTOCOL_API_KEY;

    let url = "";
    if (imageId == 3) {
        url = "https://i.imgur.com/oWx6DKY.png"
    } else if (imageId == 2) {
        url = "https://i.imgur.com/s2qKwWx.png"
    } else {
        url = "https://i.imgur.com/bmFcMj1.png"
    }

    let data = JSON.stringify({
        "name": `Onchain Report Card`,
        "image": url,
        "receiverAddress": receiverAddress,
        "attributes": degenData,
    });

    let config = {
        method: 'post',
        url: 'https://api.underdogprotocol.com/v2/projects/c/2/nfts',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: data
    };

    const result = axios(config).then(function (response) {
        console.log(JSON.stringify(response.data));
        return response.data
    }).catch(function (error) {
        console.log(error);
    });

    const mintAddress = result.transactionId;
    res.status(200).json({ mintAddress });
}