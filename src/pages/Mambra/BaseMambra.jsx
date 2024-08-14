import { Outlet, NavLink } from 'react-router-dom';

const Base = () => {

    return (
        <>
        <div className='text-center'>  <h1>Mambra</h1> </div>
        <div class="d-flex justify-content-center bd-highlight mb-3">
            <div class="p-2 bd-highlight"><NavLink to='/mambra' >Accueil</NavLink></div>
            <div class="p-2 bd-highlight"><NavLink to='/mambra/liste-mambra' >Liste mambra</NavLink></div>
            <div class="p-2 bd-highlight"><NavLink to='/mambra/liste-famille' >Liste par famille</NavLink></div>
            <div class="p-2 bd-highlight"><NavLink to='/mambra/nouveau' >Nouveau</NavLink></div>
        </div>
       
            <Outlet/>
        </>
    );
};

export default Base;