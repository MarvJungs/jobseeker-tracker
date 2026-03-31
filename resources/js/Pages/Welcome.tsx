import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function Welcome({}) {
    return (
        <>
            <Head title="Welcome" />
            <header>
                <Navbar />
            </header>
            <main>
                <h1>Job Tracker</h1>
                <p>Welcome to the Jobtracker! Here you can keep track of your progress regarding your jobhunt!</p>
                <p>This comes with an integrated dashboard where you can see your data visualized and a small management system. </p>
                <p>To get started, please create an account or log in with your created account</p>
            </main>
        </>
    )
}
