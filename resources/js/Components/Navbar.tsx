import { PageProps } from "@/types";
import { usePage, Link } from "@inertiajs/react";

export default function Navbar() {
    const { auth } = usePage().props as PageProps;

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" href={'#'}>JobTracker</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    {auth.user && (
                        <>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" href={route('dashboard')}>Dashboard</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" href={route('jobs')}>Jobapplications</Link>
                                </li>
                            </ul>
                        </>
                    )}


                    <div className="ms-auto d-flex gap-2">
                        {auth.user ? (
                            <>
                                <Link className="btn btn-outline-info" href={route('job.create')} as={"button"}>Add Job</Link>
                                <Link className="btn btn-outline-success" method={"post"} href={route('logout')} as={"button"}>Logout</Link>
                            </>
                        ) : (
                            <>
                                <Link className="btn btn-outline-primary" href={route('login')} as={"button"}>Login</Link>
                                <Link className="btn btn-outline-secondary" href={route('register')} as={"button"}>Register</Link>
                            </>
                        )
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}