import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Import() {
    const [formData, setFormData] = useState({
        file: ''
    });

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files
        }));
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                '/jobs/import',
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(error.response?.data);
            }
        }
    }
    return (
        <AuthenticatedLayout header="Dashboard">
            <form onSubmit={onSubmit}>
                <div className="row mb-3">
                    <div className="col">
                        <InputLabel htmlFor="file" className="form-label" value="File to Import" />
                        <TextInput type="file" className="form-control" name="file" onChange={onChangeInput} />
                    </div>
                </div>
                <button className="btn btn-primary" type="submit">Import Jobs!</button>
            </form>
        </AuthenticatedLayout>
    );
}