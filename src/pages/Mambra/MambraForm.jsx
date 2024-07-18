import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Define the validation schema
const schema = yup.object().shape({
    nom: yup.string().required('Nom is required').max(255, 'Nom cannot exceed 255 characters'),
    prenom: yup.string().max(255, 'Prenom cannot exceed 255 characters'),
    sexe: yup.string().required('Sexe is required'),
    dateNaissance: yup.date().max(new Date(), 'Date cannot be in the future').nullable(),
    trancheAge: yup.string().matches(/^\d+-\d+$/, 'Tranche d\'Age should be in the format "number-number"'),
    baptise: yup.boolean()
});

const MambraForm = ({ defaultValues }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues || {
            nom: '',
            prenom: '',
            sexe: '',
            dateNaissance: null,
            trancheAge: '',
            baptise: false
        }
    });

    const onSubmit = data => {
        console.log(data);
        // Here you would typically send the data to your backend API
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="nom">Nom:</label>
                <input id="nom" {...register('nom')} />
                {errors.nom && <span>{errors.nom.message}</span>}
            </div>

            <div>
                <label htmlFor="prenom">Prenom:</label>
                <input id="prenom" {...register('prenom')} />
                {errors.prenom && <span>{errors.prenom.message}</span>}
            </div>

            <div>
                <label htmlFor="sexe">Sexe:</label>
                <select id="sexe" {...register('sexe')}>
                    <option value="">Select...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                {errors.sexe && <span>{errors.sexe.message}</span>}
            </div>

            <div>
                <label htmlFor="dateNaissance">Date de Naissance:</label>
                <input type="date" id="dateNaissance" {...register('dateNaissance')} />
                {errors.dateNaissance && <span>{errors.dateNaissance.message}</span>}
            </div>

            <div>
                <label htmlFor="trancheAge">Tranche d'Age:</label>
                <input id="trancheAge" {...register('trancheAge')} />
                {errors.trancheAge && <span>{errors.trancheAge.message}</span>}
            </div>

            <div>
                <label htmlFor="baptise">Baptise:</label>
                <input type="checkbox" id="baptise" {...register('baptise')} />
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default MambraForm;