
const axios = require('axios');
const BASE_URL = process.env.BACKEND_URL

export default async function handler(req, res) {

    if (req.method === "GET") {
        console.log("GET")
    }

    if (req.method === "POST") {


        const degenData = req.body.data
        const { wallet } = req.body.params;

        console.log(degenData)
        console.log(wallet)

        const resp = await axios.post(`${BASE_URL}/mint`, {
            params: {
                wallet: wallet,
            },
            data: {
                degenData: degenData
            }
        })

        console.log(resp.data)

        res.status(200).json("success")

      
    }
}