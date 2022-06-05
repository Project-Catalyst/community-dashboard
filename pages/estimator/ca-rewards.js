import Layout from "../../components/layout";
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'

export default function CaRewards() {
    const router = useRouter()
    const { assessorId } = router.query

    return (
        <Layout>
            <Head>
                <title>CA Rewards Estimate</title>
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