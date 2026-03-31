import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Layout from '@/Layouts/Layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <Layout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div className='row mb-3'>
                    <InputLabel htmlFor="email" value="Email" className='col-sm-2 col-form-label' />
                    <div className='col-sm-10'>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.email} className="mt-2" />
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
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                    </div>

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="row mb-3">
                    <div className='col-sm-10 offset-sm-2'>
                        <div className='form-check'>
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData(
                                        'remember',
                                        (e.target.checked || false) as false,
                                    )
                                }
                            />
                            <InputLabel className='form-check-label'>
                                Remember me
                            </InputLabel>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                        >
                            Forgot your password?
                        </Link>
                    )}

                </div>
                <PrimaryButton className="ms-4" disabled={processing}>
                    Log in
                </PrimaryButton>
            </form>
        </Layout>
    );
}
