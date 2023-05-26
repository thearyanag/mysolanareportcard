import { RawOff } from '@mui/icons-material';

const axios = require('axios');

const searchNFT = require('../../functions/searchNFT');

export default async function handler(req, res) {

    if (req.method === "GET") {
        console.log("GET")
    }

    if (req.method === "POST") {


        const degenData = req.body.data
        const { wallet } = req.body.params;

        console.log("degenData", degenData)
        console.log("wallet", wallet)

        let walletData = await searchNFT(wallet);

        if(walletData) {
            console.log("walletData", walletData)
            res.status(200).json({ mintAddress: walletData });
            return;
        }


        if (wallet == undefined) {
            res.status(400).json({ error: 'Missing receiverAddress' });
            return;
        }


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
            "name": `My Report Card`,
            "image": url,
            "receiverAddress": wallet,
            "attributes": degenData,
        });

        let config = {
            method: 'post',
            url: 'https://api.underdogprotocol.com/v2/projects/c/4/nfts',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        const result = axios(config).then(function (response) {
            return response.data
        }).catch(function (error) {
            console.log(error);
        });

        res.status(200);
    }
}