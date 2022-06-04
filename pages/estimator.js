import Layout from "../components/layout";
import Head from 'next/head';
import Link from '@mui/material/Link';

import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Estimator() {
    return (
        <Layout>
            <Head>
                <title>Rewards Estimator</title>
            </Head>
            <div class="container border mt-5 p-5">
                <div class="row justify-content-center align-items-center">
                    <div class="col-md-3">
                        <InputLabel className="text-dark">
                            CA Rewards Estimator
                        </InputLabel>
                        <TextField
                            id="outlined-basic"
                            label="Assessor_ID (search)"
                            variant="outlined" />
                    </div>
                    <div class="col-md-1">
                        <Button variant="outlined">Go!</Button>
                    </div>
                </div>
                <div class="row justify-content-center mt-5 align-items-center">
                    <div class="col-md-3">
                        <InputLabel className="text-dark">
                            vCA Rewards Estimator
                        </InputLabel>
                        <TextField
                            id="outlined-basic"
                            label="vCA reviewer (search)"
                            variant="outlined"
                        />
                    </div>
                    <div class="col-md-1">
                        <Button variant="outlined">Go!</Button>
                    </div>
                </div>
            </div>
        </Layout >
    )
}