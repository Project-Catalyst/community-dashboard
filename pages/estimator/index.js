import Layout from "../../components/layout";
import Head from 'next/head';
import Link from 'next/link';

import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from "react";
import { useRouter } from 'next/router';


export default function Estimator() {
    const ENTER_KEY_CODE = 13
    const router = useRouter();

    //CA
    const [assessorId, setAssessorId] = useState("")

    const navigateToCaWithParameters = {
        pathname: '/estimator/ca-rewards',
        query: { assessorId }
    }

    function caButtonHandler(e) {
        navigateWithRouterParams(e, navigateToCaWithParameters)
    }

    function caTextInputChange(event) {
        setAssessorId(event.target.value);
    };

    //vCA
    const [vcaReviewer, setVcaRewardsInput] = useState("")

    const navigateTovCaWithParameters = {
        pathname: '/estimator/vca-rewards',
        query: { vCaRewardsInput: vcaReviewer }
    }

    function vCaButtonHandler(e) {
        navigateWithRouterParams(e, navigateTovCaWithParameters)
    }

    function vcaTextInputChange(event) {
        setVcaRewardsInput(event.target.value);
    };

    //common
    function navigateWithRouterParams(e, routerNavigationParams) {
        if (ENTER_KEY_CODE === e.keyCode) {
            router.push(routerNavigationParams)
        }
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
                            value={assessorId}
                            onKeyDown={caButtonHandler}
                            onChange={caTextInputChange}
                            id="outlined-basic"
                            label="Assessor_ID (search)"
                            variant="outlined" />
                    </div>
                    <div className="col-md-1">
                        <Link
                            href={navigateToCaWithParameters}
                            passHref>
                            <Button variant="outlined">Go!</Button>
                        </Link>
                    </div>
                </div>
                <div className="row justify-content-center mt-5 align-items-center">
                    <div className="col-md-3">
                        <InputLabel className="text-dark">
                            vCA Rewards Estimator
                        </InputLabel>
                        <TextField
                            value={vcaReviewer}
                            onKeyDown={vCaButtonHandler}
                            onChange={vcaTextInputChange}
                            id="outlined-basic"
                            label="vCA reviewer (search)"
                            variant="outlined"
                        />
                    </div>
                    <div className="col-md-1">
                        <Link
                            query={vcaReviewer}
                            href={navigateTovCaWithParameters}
                            passHref>
                            <Button variant="outlined">Go!</Button>
                        </Link>

                    </div>
                </div>
            </div>
        </Layout >
    )
}