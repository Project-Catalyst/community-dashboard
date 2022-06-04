import Layout from "../components/layout";
import Head from 'next/head';
import Link from 'next/link';

export default function VcaRewards({ assessorId }) {
    return (
        <Layout>
            <Head>
                <title>vCA Rewards Estimate</title>
            </Head>
            <div>
                <p>
                    {assessorId}
                </p>
                <Link href="/estimator">
                    <a>← Back to estimator</a>
                </Link>
            </div>
        </Layout>
    )
}