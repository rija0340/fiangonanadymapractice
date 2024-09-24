import { Outlet, NavLink,useLocation } from 'react-router-dom';
import { useFetchData } from '../../hooks/useFetchData';
import { useEffect, useState } from 'react';
import styles from  './BaseMambra.module.scss';

const Base = () => {
    const location = useLocation();
    const { data: mambras, loading: loadingMambra, error: errorMambra } = useFetchData("http://localhost:8000/apip/mambras");
    const { data: familles, loading: loadingFamille, error: errorFamilles } = useFetchData("http://localhost:8000/apip/familles");
    
    const [stats, setStats] = useState({
        totalMambras: 0,
        baptised: 0,
        unbaptised: 0,
        male: 0,
        female: 0,
        totalFamilles: 0
    });

    useEffect(() => {
        if (mambras && familles) {
            setStats({
                totalMambras: mambras.length,
                baptised: mambras.filter(m => m.baptise).length,
                unbaptised: mambras.filter(m => !m.baptise).length,
                male: mambras.filter(m => m.sexe === 'masculin').length,
                female: mambras.filter(m => m.sexe === 'feminin').length,
                totalFamilles: familles.length
            });
        }
    }, [mambras, familles]);

    return (
        <>
            <div className='text-center'><h1>Mambra</h1></div>

            <div className="d-flex justify-content-center  mb-3">
            <ul class="nav ">
            <li class="nav-item">
                <div className="p-2 "><NavLink className='nav-link' to='/mambra'>Accueil</NavLink></div>
            </li>
                <li class="nav-item">
                <div className="p-2 "><NavLink className='nav-link' to='/mambra/liste-mambra'>Liste mambra</NavLink></div>
                </li>
                <li class="nav-item">
                <div className="nav-link p-2 "><NavLink className='nav-link' to='/mambra/liste-famille'>Liste par famille</NavLink></div>
                </li>
                
                <li class='nav-item dropdown'>
                    <a class={'nav-link dropdown-toggle' + styles.dropdownNouveau} data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Nouveau</a>
                    <ul class="dropdown-menu">
                        <li><NavLink className="dropdown-item" to='/mambra/nouveau'>Nouveau Mambra</NavLink></li>
                        <li><NavLink className="dropdown-item" to='/mambra/nouvelle-famille'>Nouvelle Famille</NavLink></li>
                    </ul>
                </li>
            </ul>
            </div>
           
       
            {/* Dashboard */}
            {location.pathname == '/mambra' &&  <>
            <div className="container mb-4">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Total Mambras</h5>
                                <p className="card-text display-4">{stats.totalMambras}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Baptised</h5>
                                <p className="card-text display-4">{stats.baptised}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Unbaptised</h5>
                                <p className="card-text display-4">{stats.unbaptised}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Male</h5>
                                <p className="card-text display-4">{stats.male}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Female</h5>
                                <p className="card-text display-4">{stats.female}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Total Familles</h5>
                                <p className="card-text display-4">{stats.totalFamilles}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>

            }
             <Outlet/> 
        </>
    );
};

export default Base;