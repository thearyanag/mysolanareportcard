const getNFTStats = require('./getNFTStats');
const getProgramsInteracted = require('./getProgramsInteracted');
const getStakedAccounts = require('./getStakedAccounts');
const getWalletAge = require('./getWalletAge');

const getOnchainData = async (address) => {

    const nftStats = await getNFTStats(address);
    const programsInteracted = await getProgramsInteracted(address);
    const stakedAccounts = await getStakedAccounts(address);
    const walletAge = await getWalletAge(address);

    let nftScore, programScore, stakedScore, walletAgeScore;

    let nftSold = nftStats.nftSold.total
    let nftBought = nftStats.nftBought.total

    let nftTotal = nftStats.nftSold.volume + nftStats.nftBought.volume;



    let uniqueProgramInteractions = Object.keys(programsInteracted.programs).length;
    let totalInteractions = programsInteracted.total;
    let uniqueTransactionTypes = Object.keys(programsInteracted.type).length;

    let stakedSol = stakedAccounts.stakedSol;

    let walletage = walletAge.age;
    let firstInteraction = walletAge.firstDate;
    let lastInteraction = walletAge.lastDate;


    if (nftTotal < 10) {
        nftScore = 1;
    } else if (nftTotal < 100) {
        nftScore = 2;
    } else if (nftTotal < 500) {
        nftScore = 3;
    } else {
        nftScore = 4;
    }

    if (uniqueProgramInteractions.total < 10) {
        programScore = 1;
    } else if (uniqueProgramInteractions.total < 20) {
        programScore = 2;
    } else {
        programScore = 3;
    }

    if(uniqueTransactionTypes < 10) {
        programScore += 0.5;
    } else if (uniqueTransactionTypes < 20) {
        programScore += 1;
    } else {
        programScore += 1.5;
    }

    if (stakedSol < 100) {
        stakedScore = 1;
    } else if (stakedSol < 1000) {
        stakedScore = 2;
    } else {
        stakedScore = 3;
    }

    if (walletage.age < 12) {
        walletAgeScore = 1;
    } else if (walletage.age < 24) {
        walletAgeScore = 2;
    } else {
        walletAgeScore = 3;
    }

    if (totalInteractions < 100) {
        walletAgeScore += 0.5;
    } else if (totalInteractions < 1000) {
        walletAgeScore += 1;
    } else {
        walletAgeScore += 1.5;
    }

    let totalScore = (30*nftScore + 30*programScore + 20*stakedScore + 20*walletAgeScore)/100;
    console.log(totalScore);

    let status = 0;
    if(totalScore < 2.5) {
        status = 1;
    } else if (totalScore < 3.5) {
        status = 2;
    } else {
        status = 3;
    }

    return {
        nftSold,
        nftBought,
        nftTotal,
        uniqueProgramInteractions,
        totalInteractions,
        uniqueTransactionTypes,
        stakedSol,
        walletage,
        firstInteraction,
        lastInteraction,
        status
    }

}

module.exports = getOnchainData;
