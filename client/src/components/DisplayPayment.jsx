import React from 'react';

import { loader } from '../assets';


const DisplayPayment = ({ title, isLoading, campaigns }) => {
    return (

        <div>
            <h1 className="font-epilogue font-semibold text-[18px] text-[#13131a] dark:text-white text-left">{title}</h1>

            <div className="relative overflow-x-auto">
            {isLoading && (
                    <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain"/>
                )}
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Donators
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Donated
                            </th>
                        </tr>
                    </thead>
                    
                {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => {
                    return(
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                               {campaign.donator}
                            </th>
                            <td className="px-6 py-4">
                            {campaign.donation}
                            </td>
                        </tr>
                    </tbody>
                    )
                })}
                </table>
            </div>

        </div>
    )
}

export default DisplayPayment