import React, {useState, useEffect} from 'react'

import {DisplayPayment} from '../components';
import {useStateContext} from '../context'

const Payment = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);

    const {address, contract, getAllDonators} = useStateContext();

    const fetchCampaigns = async () => {
        setIsLoading(true);
        // const data = await getUserCampaigns();
        const data = await getAllDonators();
        // console.log(donate)
        setCampaigns(data);
        setIsLoading(false);
    }

    useEffect(() => {
        if (contract) fetchCampaigns();
    }, [address, contract]);

    return (
        <DisplayPayment
            title="All Payment"
            isLoading={isLoading}
            campaigns={campaigns}
        />
    )
}

export default Payment