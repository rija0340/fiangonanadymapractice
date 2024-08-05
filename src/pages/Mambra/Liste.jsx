import { NavLink } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import { useState, useEffect } from "react";
import ExportPDF from "../../utils/ExportPDF";

export default function Liste() {
  //gender filter 
  // const [filters, setFilters] = useState({
  //   gender: {
  //     all: true,
  //     male: false,
  //     female: false,
  //   },
  //   baptism: {
  //     all: true,
  //     baptised: false,
  //     unbaptised: false,
  //   },
  //   search: ""
  // })

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

  const trancheAgeOptions = [
    { value: "0_2", label: "0-2" },
    { value: "3_4", label: "3-4" },
    { value: "5_12", label: "5-12" },
    { value: "13_15", label: "13-15" },
    { value: "16_18", label: "16-18" },
    { value: "19_35", label: "19-35" },
    { value: "35+", label: "35+" },
  ];

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

  const handleFilterGenderChange = (e) => {
    const gender = e.target.value;
    setFilters(prevFilters => {
      return {
        ...prevFilters,
        sexe: gender
      };
    });
  }

  const handleFilterBaptiseChange = (e) => {
    const baptise = e.target.value;
    setFilters(prevFilters => {
      return {
        ...prevFilters,
        baptise
      };
    });
  }

  const handleOrderByNameChange = (e) =>{

    const orderByName = e.target.value;
    setFilters(prevFilters => {
      return {
        ...prevFilters,
        orderByName
      };
    });
  }


  const renderGenderRadio = () => (
    <>
      <div className="form-check">
        <input className="form-check-input" type="radio" name="sexe" id="allsexe" value="" onChange={handleFilterGenderChange} />
        <label className="form-check-label" htmlFor="allsexe">
          Tous
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="radio" name="sexe" id="masculin" value="masculin" onChange={handleFilterGenderChange} />
        <label className="form-check-label" htmlFor="masculin">
          Masculin
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="radio" name="sexe" id="feminin" value="feminin" onChange={handleFilterGenderChange} />
        <label className="form-check-label" htmlFor="feminin">
          Feminin
        </label>
      </div>

    </>
  )

  const renderBaptiseRadio = () => (
    <>
      <div className="form-check">
        <input className="form-check-input" type="radio" name="baptise" id="allmixed" value="" onChange={handleFilterBaptiseChange} />
        <label className="form-check-label" htmlFor="allmixed">
          Tous
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="radio" name="baptise" id="baptise" value="1" onChange={handleFilterBaptiseChange} />
        <label className="form-check-label" htmlFor="baptise">
          Baptisé
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="radio" name="baptise" id="unbaptise" value="0" onChange={handleFilterBaptiseChange} />
        <label className="form-check-label" htmlFor="unbaptise">
          Non baptisé
        </label>
      </div>

    </>
  )

  const renderTrancheAgeFilter = () => (
    <>
      <div>
        {trancheAgeOptions.map((option) => (
          <label key={option.value}>
            <input
              type="checkbox"
              value={option.value}
              onChange={handleTrancheAgeChange}
            />{" "}
            {option.label}
          </label>
        ))}
      </div>
    </>
  )

  const renderOrderByPrenom = () => (

    <>
      
      <select className='form-control' onChange={handleOrderByNameChange}>
        <option value="">Select...</option>
        <option value="asc">Ascendant</option>
        <option value="desc">Descendant</option>
      </select>

    </>

    )

  const handleTrancheAgeChange = (event) => {
    console.log("filters");
    const { value, checked } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      trancheAge: checked
        ? [...prevFilters.trancheAge, value]
        : prevFilters.trancheAge.filter(age => age !== value)
    }));
  };

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
              <h4>Gender</h4>
              <div >
                {renderGenderRadio()}
              </div>
              <h4>Baptism</h4>
              <div >
                {renderBaptiseRadio()}
              </div>

              <h4>Tranche d'age</h4>
              <div >
                {renderTrancheAgeFilter()}
              </div>
              <div className="mt-3 mb-3">
              <h4>Order by prénom</h4>
              {renderOrderByPrenom()}
              </div>

              <button className="btn btn-success"  onClick={()=>ExportPDF(mambras)} > Exporter </button>
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