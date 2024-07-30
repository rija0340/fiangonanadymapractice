import { NavLink } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import { useState, useEffect } from "react";

export default function Liste() {
  console.log('render list');
    //gender filter 
    const [filters, setFilters] = useState({
      gender: {
        all: true,
        male: false,
        female: false,
      },
      baptism: {
        all: true,
        baptised: false,
        unbaptised: false,
      },
      search : ""
    })

    const [nameFilter, setNameFilter] = useState({
      prenom : ""
    });


  const { data: mambras, loading: loadingMambra, error: errorMambra } = useFetchData("http://localhost:8000/apip/mambras",nameFilter);
  const { data: familles, loading: loadingFamille, error: errorFamilles } = useFetchData("http://localhost:8000/apip/familles",filters);
  const [toDisplay, setToDisplay] = useState('mambra');
  const [filteredData, setFilteredData] = useState([]);
  const [nbByGenderFilter, setNbByGenderFilter] = useState(0);

  useEffect(() => {
    // Apply filters when data or filters change
    const applyFilters = () => {
      let filtered = mambras;
      let genderFilter = filters['gender'];
      console.dir(filters);
      let baptismFilter = filters['baptism'];
      let searchFilter = filters['search'];

      if (searchFilter) {
        filtered = filtered.filter(item => 
          {
            if (item && (item.nom || item.prenom)) {
              return (
                (item.nom && item.nom.toLowerCase().includes(searchFilter)) ||
                (item.prenom && item.prenom.toLowerCase().includes(searchFilter))
              );
            }
            return false;
          }
        );
      }

      if (genderFilter.male && !genderFilter.female) {
        filtered = filtered.filter(item => item.sexe === "masculin");
      }
      if (genderFilter.female && !genderFilter.male) {
        filtered = filtered.filter(item => item.sexe === "feminin");
      }

      if (baptismFilter.baptised && !baptismFilter.unbaptised) {
        filtered = filtered.filter(item => item.baptise == true);
      }
      if (!baptismFilter.baptised && baptismFilter.unbaptised) {
        filtered = filtered.filter(item => item.baptise == false);
      }

      setFilteredData(filtered);
      setNbByGenderFilter(filtered.length);
    };
    applyFilters();
  }, [mambras, filters]);


  const listeMambra = filteredData.map((item) => {
    return (<tr key={item.id}>
      <td>{item.nom}</td>
      <td>{item.prenom}</td>
      <td>{item.sexe}</td>
      <td>{item.baptise ? 'yes' : 'no'}</td>
      <td>
        <div class="btn-group btn-group-sm">
          <NavLink class="btn btn-success" to={`../../mambra/${item.id}/edit`}> Edit </NavLink>
          <button type="button" class="btn btn-primary">Show</button>
          <button type="button" class="btn btn-danger">Delete</button>
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

  const renderCheckboxes = (category) => (
    Object.entries(filters[category]).map(([key, value]) => (
      <label key={`${category}-${key}`}>
        <input
          type="checkbox"
          name={key}
          checked={value}
          onChange={(e) => handleFilterChange(category, key, e.target.checked)}
        />
        {key.charAt(0).toUpperCase() + key.slice(1)}
      </label>
    ))
  );
  const handleFilterChange = (category, name, checked) => {
    setFilters(prevFilters => {
      const newCategoryFilters = { ...prevFilters[category] };

      if (name === 'all') {
        Object.keys(newCategoryFilters).forEach(key => {
          newCategoryFilters[key] = checked;
        });
      } else {
        newCategoryFilters[name] = checked;
        newCategoryFilters.all = Object.keys(newCategoryFilters)
          .filter(key => key !== 'all')
          .every(key => newCategoryFilters[key]);

      }

      return {
        ...prevFilters,
        [category]: newCategoryFilters
      };
    });
  };

  const handleSearch = (e) => {
    const search = e.target.value.toLowerCase();
    // setFilters(prevFilters => {
    //   return {
    //     ...prevFilters,
    //     search
    //   };
    // });


    setNameFilter(prevNameFilter => {
      return {
        ...prevNameFilter,
        nom : search
      };
    });

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

            <h3>Filtres (nb: {nbByGenderFilter})</h3>
            <div>
              <h4>Gender</h4>
              <div >
                {renderCheckboxes('gender')}
              </div>
              <h4>Baptism</h4>
              <div >
                {renderCheckboxes('baptism')}
              </div>
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