import Layout from "../components/layout";
import Head from 'next/head';
import Link from 'next/link';

export default function CaRewards({ vcaReviewer }) {
    return (
        <Layout>
            <Head>
                <title>CA Rewards Estimate</title>
            </Head>
            <div>
                <p>
                    {vcaReviewer}
                </p>
                <Link href="/estimator">
                    <a>← Back to estimator</a>
                </Link>
            </div>
        </Layout>
    )
}