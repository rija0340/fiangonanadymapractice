import { useFetchData } from "../../hooks/useFetchData";
import { useState, useEffect } from "react";
import MambraForm from "./MambraForm";


export default function Mambra() {

  const mambras = useFetchData("http://localhost:8000/apip/mambras");
  const familles = useFetchData("http://localhost:8000/apip/familles");
  const [toDisplay, setToDisplay] = useState('mambra');
  const [filteredData, setFilteredData] = useState([]);
  const [nbByGenderFilter, setNbByGenderFilter] = useState(0);
  // const [filters, setFilters] = useState({
  //   sexe: '',
  //   baptise: '',
  // });

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
    }
  })


  useEffect(() => {
    // Apply filters when data or filters change
    const applyFilters = () => {
      let filtered = mambras;
      console.log('filters');
      console.log(filters);
      let genderFilter = filters['gender'];
      let baptismFilter = filters['baptism'];
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
          <button type="button" class="btn btn-success">Edit</button>
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

        //equivalent simplier statememnt 

        //   if (category === 'gender') {
        //     newCategoryFilters.all = newCategoryFilters.male && newCategoryFilters.female;
        //   } else if (category === 'baptism') {
        //     newCategoryFilters.all = newCategoryFilters.baptised && newCategoryFilters.unbaptised;
        //   }
      }

      return {
        ...prevFilters,
        [category]: newCategoryFilters
      };
    });
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
                <div>
                  <MambraForm></MambraForm>
                </div>
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