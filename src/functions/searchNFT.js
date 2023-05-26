const axios = require('axios')

const searchNFT = async (ownerAddress) => {

    const token = process.env.UNDERDOG_PROTOCOL_API_KEY;

    let searchConfig = {
        method: 'get',
        url: `https://api.underdogprotocol.com/v2/projects/c/4/nfts/search?search=${ownerAddress}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    let { data } = await axios(searchConfig);
    let mintAddress = data["results"][0].mintAddress;

    if (mintAddress) {
        return mintAddress;
    } else {
        return false;
    }
};

module.exports = searchNFT;