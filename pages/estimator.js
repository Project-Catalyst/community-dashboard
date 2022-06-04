import Layout from "../components/layout";
import Head from 'next/head';
import Link from 'next/link';

import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from "react";

export default function Estimator() {

    const [caRewardsInput, setCaRewardsInput] = useState("")
    const [vCaRewardsInput, setVcaRewardsInput] = useState("")

    function vcaTextInputChange(event) {
        setVcaRewardsInput(event.target.value);
    };

    function vCaButtonHandler(event) {
        console.log(vCaRewardsInput)
    }

    function caTextInputChange(event) {
        setCaRewardsInput(event.target.value);
    };

    function caButtonHandler(event) {
        console.log(caRewardsInput)
    }

    return (
        <Layout>
            <Head>
                <title>Rewards Estimator</title>
            </Head>
            <div className="container border mt-5 p-5">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-3">
                        <InputLabel
                            className="text-dark">
                            CA Rewards Estimator
                        </InputLabel>
                        <TextField
                            value={caRewardsInput}
                            onChange={caTextInputChange}
                            id="outlined-basic"
                            label="Assessor_ID (search)"
                            variant="outlined" />
                    </div>
                    <div className="col-md-1">
                        <Link
                            query={caRewardsInput}
                            href="/ca-rewards"
                            passHref>
                            <Button
                                variant="outlined"
                                onClick={caButtonHandler}>
                                Go!</Button>
                        </Link>
                    </div>
                </div>
                <div className="row justify-content-center mt-5 align-items-center">
                    <div className="col-md-3">
                        <InputLabel className="text-dark">
                            vCA Rewards Estimator
                        </InputLabel>
                        <TextField
                            value={vCaRewardsInput}
                            onChange={vcaTextInputChange}
                            id="outlined-basic"
                            label="vCA reviewer (search)"
                            variant="outlined"
                        />
                    </div>
                    <div className="col-md-1">
                        <Link query={vCaRewardsInput} href="/vca-rewards" passHref>
                            <Button
                                variant="outlined"
                                onClick={vCaButtonHandler}
                            >Go!</Button>
                        </Link>

                    </div>
                </div>
            </div>
        </Layout >
    )
}