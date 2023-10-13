import React, { useContext, useEffect, useState } from "react";
import { getPeriodRequest, getLapseRequest } from "../api/period";
import { useAuth } from "./AuthProvider";

const PeriodContext = React.createContext();

export const usePeriod = () => {
    const period = useContext(PeriodContext);
    return period;
}

export const PeriodProvider = ({ children }) => {

    const { user } = useAuth()
    const [period, setPeriod] = useState();
    const [lapse, setLapse] = useState();

    // We need to get the request everytime PeriodContext is Loading
    const getPeriod = async () => {
        // Make the request
        const res = await getPeriodRequest(user.token)
        setPeriod(res.data)
    }

    const getLapse = async () => {
        // Make the request
        const res = await getLapseRequest(user.token)
        setLapse(res.data)
    }




    return (
        <PeriodContext.Provider value={{
            period,
            lapse,
            getPeriod,
            getLapse
        }}>
            {children}
        </PeriodContext.Provider>
    )
}