
 const Filtres = ({setFilters}) => {


  const trancheAgeOptions = [
    { value: "0_2", label: "0-2" },
    { value: "3_4", label: "3-4" },
    { value: "5_12", label: "5-12" },
    { value: "13_15", label: "13-15" },
    { value: "16_18", label: "16-18" },
    { value: "19_35", label: "19-35" },
    { value: "35+", label: "35+" },
  ];

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


return (
  <>
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
  </>
  )

}



export default Filtres;