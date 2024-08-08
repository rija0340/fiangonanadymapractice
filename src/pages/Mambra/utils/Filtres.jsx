
const Filtres = () => {








}


  export const renderBaptiseRadio2 = () => (
    <>
      <div className="form-check">
        <input className="form-check-input" type="radio" name="baptise" id="allmixed" value=""  />
        <label className="form-check-label" htmlFor="allmixed">
          Tous
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="radio" name="baptise" id="baptise" value="1"  />
        <label className="form-check-label" htmlFor="baptise">
          Baptisé
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="radio" name="baptise" id="unbaptise" value="0"  />
        <label className="form-check-label" htmlFor="unbaptise">
          Non baptisé
        </label>
      </div>

    </>
  )

  export const renderGenderRadio = () => (
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
