import Layout from "../../components/layout";
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'

export default function VcaRewards() {
    const router = useRouter()
    const { vcaReviewer } = router.query

    return (
        <Layout>
            <Head>
                <title>vCA Rewards Estimate</title>
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