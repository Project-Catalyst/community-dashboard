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
            <section className="m-5">
                <InputLabel className="text-dark  m-2">
                    CA Rewards Estimator
                </InputLabel>
                <TextField
                    id="outlined-basic"
                    className="full-width m-2"
                    label="Assessor_ID (search)"
                    variant="outlined" />
                <Button variant="outlined" className="m-3">Go!</Button>
            </section>
            <section className="m-5">
                <InputLabel className="text-dark m-2">
                    vCA Rewards Estimator
                </InputLabel>
                <TextField
                    id="outlined-basic"
                    className="full-width m-2"
                    label="vCA reviewer (search)"
                    variant="outlined"
                />
                <Button variant="outlined" className="m-3">Go!</Button>
            </section>
        </Layout>
    )
}