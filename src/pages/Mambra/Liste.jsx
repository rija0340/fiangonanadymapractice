import { NavLink } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import { useState, useEffect } from "react";
import ExportPDF from "../../utils/ExportPDF";

import Filtres from "./utils/Filtres";

export default function Liste() {

  const [filters, setFilters] = useState({
    nom: "",
    prenom: "",
    sexe: "",
    baptise: "",
    trancheAge: [],
    orderByName : ""
  });


  const { data: mambras, loading: loadingMambra, error: errorMambra } = useFetchData("http://localhost:8000/apip/mambras", filters);
  const { data: familles, loading: loadingFamille, error: errorFamilles } = useFetchData("http://localhost:8000/apip/familles");
  const [toDisplay, setToDisplay] = useState('mambra');



  const listeMambra = mambras.map((item) => {
    return (<tr key={item.id}>
      <td>{item.nom}</td>
      <td>{item.prenom}</td>
      <td>{item.sexe}</td>
      <td>{item.baptise ? 'yes' : 'no'}</td>
      <td>
        <div class="btn-group btn-group-sm">
          <NavLink class="btn btn-success" to={`../../mambra/${item.id}/edit`}> Edit </NavLink>
          <button type="button" class="btn btn-primary">Show</button>
          {/* <button type="button" class="btn btn-danger">Delete</button> */}
          <NavLink class="btn btn-danger" to={`../../mambra/${item.id}/delete`}> Delete </NavLink>
        </div>
      </td>
    </tr>);
  });

  const listeFamille = familles.map((item) => {

    return (<tr key={item.id}>
      <td>{item.nom}</td>
      <td>{item.mambras.length}</td>
      <td>
        <ul>
          {item.mambras.map((i) => (<li> {i.nom} {i.prenom} </li>))}
        </ul>
      </td>
    </tr>);
  });


  const handleSearch = (e) => {
    const search = e.target.value.toLowerCase();
    setFilters(prevNameFilter => {
      return {
        ...prevNameFilter,
        prenom: search
      };
    });
  }


const handleExportPDF = () => {

  let headers = [["Nom","Prenom","Sexe","Baptise",]];
  let liste = mambras.map(elt=> [elt.nom, elt.prenom, elt.sexe,elt.baptise ? 'yes' : 'no' ]); 

  console.log(liste, headers);

  ExportPDF(headers,liste,"Liste des mambra");

}

  return (
    <>
      <div className="row">
        <div className="col-md-3 ">

          <div className="menu-lateral border border-danger">
            <h3>Catégories</h3>
            <ul>
              <li onClick={() => setToDisplay('mambra')} className={toDisplay == 'mambra' ? 'activate ' : ''} > Mambra</li>
              <li onClick={() => setToDisplay('famille')} className={toDisplay == 'famille' ? 'activate' : ''}  > familles</li>
              <li> Mambra par famille</li>
            </ul>

            <h3>Filtres (nb: {mambras.length})</h3>
            <div>
            <Filtres setFilters={setFilters} ></Filtres>
            <button className="btn btn-success"  onClick={handleExportPDF} > Exporter </button>
            </div>
          </div>

        </div>
        <div className="col-md-9">

          {toDisplay == 'mambra' ?
            (
              <>
                <div class="d-flex justify-content-end">
                  <div class="p-2 bd-highlight">Recherche</div>
                  <div class="p-2 bd-highlight"><input type="text" onChange={handleSearch} className="form-control" /></div>
                </div>
                <table className="table">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">Nom</th>
                      <th scope="col">Prénom</th>
                      <th scope="col">Sexe</th>
                      <th scope="col">baptisé</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listeMambra}
                  </tbody>
                </table>
              </>

            ) : toDisplay == 'famille' ? (
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
            ) : null
          }
        </div>
      </div>

    </>
  );
}