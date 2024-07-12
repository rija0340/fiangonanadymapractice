import { useFetchData } from "../../hooks/useFetchData";
import { useState,useEffect } from "react";


export default function Mambra() {

    const mambras = useFetchData("http://localhost:8000/apip/mambras");
    const familles = useFetchData("http://localhost:8000/apip/familles");
    const [toDisplay, setToDisplay] = useState('mambra');
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState({
      sexe: '',
      baptise: '',
    });

    useEffect(() => {
        // Apply filters when data or filters change
        const applyFilters = () => {
          let filtered = mambras;
    
          if (filters.sexe) {
            filtered = filtered.filter(item => item.sexe === filters.sexe);
          }
    
          if (filters.baptise) {
            filtered = filtered.filter(item => item.baptise === filters.baptise);
          }
    
          setFilteredData(filtered);
        };
    
        applyFilters();
      }, [mambras, filters]);

    console.log( familles);

    const listeMambra = mambras.map((item)=> {
        return (<tr key={item.id}>
        <td>{item.nom}</td>
        <td>{item.prenom}</td>
        <td>{item.sexe}</td>
        <td>{item.baptise ? 'yes' : 'no'}</td>
        </tr>);
    });

    const listeFamille = familles.map((item)=> {

        console.log(item);
        return (<tr key={item.id}>
        <td>{item.nom}</td>
        <td>{item.mambras.length}</td>
        <td>
            <ul>
                {item.mambras.map((i)=>(<li> {i.nom} {i.prenom} </li>))}
            </ul>
        </td>
        </tr>);
    });

    return (
        <>
        <div className="row">
            <div className="col-md-3 ">
            
            <div className="menu-lateral border border-danger">
                <h3>Catégories</h3>
                <ul>
                    <li onClick={()=>setToDisplay('mambra')}  className={ toDisplay == 'mambra' ? 'activate ' : '' } > Mambra</li>
                    <li onClick={()=>setToDisplay('famille')} className={ toDisplay == 'famille' ? 'activate' : '' }  > familles</li>
                    <li> Mambra par famille</li>
                </ul>

                <h3>Filtres</h3>
            </div>
                
            </div>
            <div className="col-md-9">

            { toDisplay == 'mambra' ?
                (
                    <table className="table">
                        <thead class="thead-dark">
                            <tr>
                            <th scope="col">Nom</th>
                            <th scope="col">Prénom</th>
                            <th scope="col">Sexe</th>
                            <th scope="col">baptisé</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listeMambra}
                        </tbody>
                    </table>
                ): toDisplay == 'famille' ? (
                    <div>                   
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                <th scope="col">Nom</th>
                                <th scope="col">Nombre membres</th>
                                <th scope="col">membres</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listeFamille}
                            </tbody>
                        </table>
                </div>
                ): null
            }
            </div>
        </div>

        </>
    );
}