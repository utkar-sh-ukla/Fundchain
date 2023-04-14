import React, {useContext, createContext} from 'react';

import {useAddress, useContract, useMetamask, useContractWrite} from '@thirdweb-dev/react';
import {ethers} from 'ethers';
import {EditionMetadataWithOwnerOutputSchema} from '@thirdweb-dev/sdk';

const StateContext = createContext();

export const StateContextProvider = ({children}) => {
	const {contract} = useContract('0xf8d9C2751672807bF4D11608A901A6a06B5610D2');
    const {mutateAsync: createCampaign} = useContractWrite(contract, 'createCampaign');

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async (form) => {
        try {
            const data = await createCampaign([
                address, // owner
                form.title, // title
                form.description, // description
                form.target,
                new Date(form.deadline).getTime(), // deadline,
                form.image
            ])

            console.log("contract call success", data)
        } catch (error) {
            console.log("contract call failure", error)
        }
    }

    const getCampaigns = async () => {
        const campaigns = await contract.call('getCampaigns');

        const parsedCampaings = campaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pId: i
        }));

        return parsedCampaings;
    }

    const getUserCampaigns = async () => {
        const allCampaigns = await getCampaigns();

        const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);
        console.log(allCampaigns)
        return filteredCampaigns;
    }


    const donate = async (pId, amount) => {
        const data = await contract.call('donateToCampaign', pId, {value: ethers.utils.parseEther(amount)});

        return data;
    }

    const getDonations = async (pId) => {
        const donations = await contract.call('getDonators', pId);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];

        for (let i = 0; i < numberOfDonations; i++) {
            parsedDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString())
            })
        }
        
        return parsedDonations;
    }

    const getAllDonators = async ()=>{
        const allDonators = await contract.call('getAllDonators');
        const numberOfDonations = allDonators[0][0].length;
        const parsedAllDonators = [];
        for (let i = 0; i < numberOfDonations; i++) {
            parsedAllDonators.push({
                donator: allDonators[0][0][i],
                donation: ethers.utils.formatEther(allDonators[1][0][i].toString()),
                title:allDonators[2][i]
            })
        }

        console.log(parsedAllDonators)
        return parsedAllDonators;
    }

    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                createCampaign: publishCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations,
                getAllDonators
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);