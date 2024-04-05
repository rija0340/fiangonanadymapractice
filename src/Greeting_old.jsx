import { Fragment, useState } from 'react';
import styles from './Hello.module.scss';
import { SearchBar } from './SearchBar';
import FormMambra from './FormMambra';

const element = 'Recherche';

const data = [
    {  nom: 'rija', prenom : 'rakoto'},
    {nom: 'oni', prenom : 'rakoto'},
    {nom: 'dada', prenom : 'rakoto'},
    {nom: 'neny', prenom : 'rakoto'},
];

function Greeting_o(){

    const [ donnee, setDonnee] = useState(data);
     const [ searchWord, setSearchWord] = useState('');
     const [showFormAdd, setshowFormAdd] = useState(false);

     const searchHandle = (e) => {
        setSearchWord(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formValue = new FormData(e.target);
         // Get the entries from the FormData
         let val = { nom: '', prenom: '' };

         // Get the entries from the FormData
         for (const [key, value] of formValue.entries()) {
             switch (key) {
                 case 'nom':
                     val.nom = value;
                     break;
                 case 'prenom':
                     val.prenom = value;
                     break;
                 // Add more cases if needed
     
                 default:
                     break;
             }
         }
        setDonnee([...donnee,val]);
        console.log(donnee);
    }

    const handleShowForm = (e) =>{
        console.log("checkbox e.target.value");
        console.log(e.target.checked);

        setshowFormAdd(e.target.checked);

    }

    const filteredData  = donnee.filter(mambra => mambra.nom.includes(searchWord));

    return(
        <>

        <div className='justify-content-center  '  >
           {/* <CheckboxAddNew></CheckboxAddNew> */}

           <div>
        <input type="checkbox" onChange={handleShowForm} checked={showFormAdd}  id='addForm' name='addForm' className='form-check-control ' />
        <label htmlFor="addForm"className=''> Ajouter Nouveau mambra</label>
        </div>

            <div className='row'>
                <div className={ showFormAdd ? 'col-6' : 'col-12' }>
                 <h3>{element}</h3> 
                 <div className='mb-3'>  
                    <SearchBar searchHandle = {searchHandle}  ></SearchBar>
                </div>
                    {filteredData.map(mambra => 
                        <Fragment key={mambra.nom}>
                            <p key={mambra.nom}> {mambra.nom} </p>
                        </Fragment>
                    )}
                </div>
                    { showFormAdd && (
                        <>
                        <div className="col-6">
                            <h3>Nouveau</h3> 
                            <FormMambra handleFormSubmit={handleFormSubmit} ></FormMambra>
                        </div>
                        </>
                        )
                    }
        </div>
        </div>
        </>
    );
}


// function CheckboxAddNew({handleShowForm}){
//     return (
        

//     );
// }

export default Greeting_o;