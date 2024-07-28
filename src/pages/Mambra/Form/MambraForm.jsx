import React from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useFetchData } from '../../../hooks/useFetchData';
import { formatDateForInput } from '../../../utils/FormatDate';

// Define the validation schema
const schema = yup.object().shape({
    nom: yup.string().required('Nom is required').max(255, 'Nom cannot exceed 255 characters'),
    prenom: yup.string().max(255, 'Prenom cannot exceed 255 characters'),
    sexe: yup.string().required('Sexe is required'),
    dateNaissance: yup.date().max(new Date(), 'Date cannot be in the future').nullable(),
    trancheAge: yup.string().required('Tranche age is required'),
    // trancheAge: yup.string().matches(/^\d+-\d+$/, 'Tranche d\'Age should be in the format "number-number"'),
    baptise: yup.boolean(),
    famille: yup.string().required('Famille required'),
});

const MambraForm = ({ defaultValues, handleSubmitData, id }) => {


    const { data: familles, loading: loadingFamille, error: errorFamille } = useFetchData("http://localhost:8000/apip/familles");

    console.log("familles");
    console.log(familles);

    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues || {
            nom: '',
            prenom: '',
            sexe: '',
            dateNaissance: null,
            trancheAge: '',
            baptise: false,
            famille: ''
        }
    });

    const { data: mambra, loading: loading, error: error } = useFetchData(id ? `http://localhost:8000/apip/mambras/${id}` : null);

    useEffect(() => {
        if (mambra) {
            console.log("response.data", mambra);
            const formattedData = {
                ...mambra,
                dateNaissance: formatDateForInput(mambra.dateNaissance)
            };
            console.log(formatDateForInput(mambra.dateNaissance));
            reset(formattedData);
        }
    }, [mambra, reset]);

    const onSubmit = data => {
        handleSubmitData(data);
        // Here you would typically send the data to your backend API
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="nom">Nom:</label>
                <input className='form-control' id="nom" {...register('nom')} />
                {errors.nom && <span>{errors.nom.message}</span>}
            </div>

            <div>
                <label htmlFor="prenom">Prenom:</label>
                <input className='form-control' id="prenom" {...register('prenom')} />
                {errors.prenom && <span>{errors.prenom.message}</span>}
            </div>

            <div>
                <label htmlFor="sexe">Sexe:</label>
                <select className='form-control' id="sexe" {...register('sexe')}>
                    <option value="">Select...</option>
                    <option value="masculin">Male</option>
                    <option value="feminin">Female</option>
                </select>
                {errors.sexe && <span>{errors.sexe.message}</span>}
            </div>

            <div>
                <label htmlFor="dateNaissance">Date de Naissance:</label>
                <input className='form-control' type="date" id="dateNaissance" value={watch('dateNaissance') || ''} {...register('dateNaissance')} />
                {errors.dateNaissance && <span>{errors.dateNaissance.message}</span>}
            </div>

            <div>
                <label htmlFor="famille">Famille</label>
                <select className='form-control' id="famille" {...register('famille')}>
                    <option value="">Sélectionner une famille</option>
                    {familles && familles.map((famille) => (
                        <option key={famille.id}
                            value={`/apip/familles/${famille.id}`}
                            selected={mambra && mambra.familleId == famille.id}
                        >
                            {famille.nom}
                        </option>
                    ))}
                </select>
                {errors.famille && <span>{errors.famille.message}</span>}
            </div>

            <div>
                <label htmlFor="trancheAge">Tranche d'Age:</label>
                <select className='form-control' id="trancheAge" {...register('trancheAge')}>
                    <option value="">Select...</option>
                    <option value="0_2">0 à 2</option>
                    <option value="3_4">3 à 4</option>
                    <option value="5_12">5 à 12</option>
                    <option value="13_15">13 à 15</option>
                    <option value="16_18">16 à 18</option>
                    <option value="19_35">19 à 35</option>
                    <option value="35+">Plus de 35</option>
                </select>

                {errors.trancheAge && <span>{errors.trancheAge.message}</span>}
            </div>

            <div>
                <label htmlFor="baptise">Baptise:</label>
                <input type="checkbox" id="baptise" {...register('baptise')} />
            </div>

            <button className='btn btn-success' type="submit">Submit</button>
        </form>
    );
};

export default MambraForm;