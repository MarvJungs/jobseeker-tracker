import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Layout from '@/Layouts/Layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <Layout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div className='row mb-3'>
                    <InputLabel htmlFor="name" value="Name" className='col-sm-2 col-form-label' />
                    <div className='col-sm-10'>
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>
                </div>

                <div className="row mb-3">
                    <InputLabel htmlFor="email" value="Email" className='col-sm-2 col-form-label' />
                    <div className='col-sm-10'>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>
                </div>

                <div className="row mb-3">
                    <InputLabel htmlFor="password" value="Password" className='col-sm-2 col-form-label' />
                    <div className='col-sm-10'>
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>
                </div>

                <div className="row mb-3">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                        className='col-sm-2 col-form-label'
                    />
                    <div className='col-sm-10'>
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <Link
                        href={route('login')}
                    >
                        Already registered?
                    </Link>

                </div>
                <PrimaryButton className="ms-4" disabled={processing}>
                    Register
                </PrimaryButton>
            </form>
        </Layout>
    );
}
