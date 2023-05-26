const getOnchainData = require('../../functions/getOnchainData')

export default async function handler(req, res) {

    const { wallet } = req.query

    const onchainData = await getOnchainData(wallet)

    res.status(200).json(onchainData)
}