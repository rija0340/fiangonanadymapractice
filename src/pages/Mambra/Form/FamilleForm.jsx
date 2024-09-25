import React from 'react';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useFetchData } from '../../../hooks/useFetchData';
import { formatDateForInput } from '../../../utils/FormatDate';

// Define the validation schema
const schema = yup.object().shape({
    nom: yup.string().required('Nom is required').max(255, 'Nom cannot exceed 255 characters'),
});

const FamilleForm = ({ handleSubmitData, id = null }) => {

    // const { data: familles, loading: loadingFamille, error: errorFamille } = useFetchData("http://localhost:8000/apip/familles");

    const { register, handleSubmit, formState: { errors }, reset,control } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            nom: '',
        }
    });

    const { data: famille, loading: loading, error: error } = useFetchData(id ? `http://localhost:8000/apip/familles/${id}` : null);
    useEffect(() => {
        if (!Array.isArray(famille)) {
            reset(famille);
        }
    }, [famille, reset]);


    return (
        <form onSubmit={handleSubmit(handleSubmitData)}>
            <div>
                <label htmlFor="nom">Nom:</label>
                <input className='form-control' id="nom" {...register('nom')} />
                {errors.nom && <span>{errors.nom.message}</span>}
            </div>
            <div className='mt-2'>
                <button className='btn btn-success' type="submit">Submit</button>
            </div>
        </form>
    );
};

export default FamilleForm;