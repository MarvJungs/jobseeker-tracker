import Navbar from '@/Components/Navbar';
import { usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    return (
        <>
            <header>
                <Navbar header={header} />
            </header>
            <main>
                {children}
            </main>
        </>
    );
}
