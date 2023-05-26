const getNFTStats = require('../../functions/getNFTStats');

export default async function handler(req, res) {

    const { wallet } = req.query;

    if (wallet == undefined) {
        res.status(400).json({ error: 'Missing wallet' });
        return;
    }

    let degenData = await getNFTStats(wallet);


    return res.status(200).json(degenData);
}