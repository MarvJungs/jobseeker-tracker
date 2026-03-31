import Navbar from '@/Components/Navbar';
import { PropsWithChildren } from 'react';

export default function Layout({
    children,
}: PropsWithChildren) {

    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                {children}
            </main>
        </>
    );
}