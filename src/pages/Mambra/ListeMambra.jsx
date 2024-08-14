import { NavLink } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import { useState, useEffect } from "react";
import ExportPDF from "../../utils/ExportPDF";
import ExportModal from "../../utils/modals/ExportModal";
import Filtres from "./utils/Filtres";
import { formatDateToFr } from "../../utils/FormatDate";

export default function ListeMambra() {

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [headerExportPdf, setHeaderExportPdf] = useState([]);
  const [modalContent, setModalContent] = useState({ title: '', body: '' }); 
  const [selectedId, setSelectedId] = useState(null);
  const { data: mambra, loading: loading, error: error } = useFetchData(selectedId ? `http://localhost:8000/apip/mambras/${selectedId}` : null);

  const handleShowMambra = (id) => {
    console.log("id : " + id);
    setSelectedId(id);

    setModalContent({
      title : 'Details mambra',
      body : templateShowMambra(mambra)
    })

    setModalIsOpen(true);

  };
  const listeMambra = mambras.map((item) => {
    return (
      <tr key={item.id}>
        <td className="align-middle">{item.nom}</td>
        <td className="align-middle">{item.prenom}</td>
        <td className="align-middle">{item.sexe}</td>
        <td className="align-middle">
          <span className={`badge ${item.baptise ? 'bg-success' : 'bg-secondary'}`}>
            {item.baptise ? 'Yes' : 'No'}
          </span>
        </td>
        <td className="align-middle">
          <div className="btn-group btn-group-sm">
            <NavLink className="btn btn-outline-success" to={`../../mambra/${item.id}/edit`}>
              <i className="fas fa-edit me-1"></i> Edit
            </NavLink>
            <button type="button"  onClick={()=>handleShowMambra(item.id)} className="btn btn-outline-primary">
              <i className="fas fa-eye me-1"></i> Show
            </button>
            <NavLink className="btn btn-outline-danger" to={`../../mambra/${item.id}/delete`}>
              <i className="fas fa-trash-alt me-1"></i> Delete
            </NavLink>
          </div>
        </td>
      </tr>
    );
  });


  const templateShowMambra = (mambraObj) => {

    const { nom, prenom, sexe, dateNaissance, familleId, baptise, trancheAge } = mambraObj;
    return (
      <div className="container mt-4">
          
          <div className="">
            <dl className="row">
              <dt className="col-sm-4">Nom:</dt>
              <dd className="col-sm-8">{nom}</dd>
  
              <dt className="col-sm-4">Prénom:</dt>
              <dd className="col-sm-8">{prenom}</dd>
  
              <dt className="col-sm-4">Sexe:</dt>
              <dd className="col-sm-8">{sexe === 'masculin' ? 'Masculin' : 'Féminin'}</dd>
  
              <dt className="col-sm-4">Date de Naissance:</dt>
              <dd className="col-sm-8">{formatDateToFr(dateNaissance)}</dd>
  
              <dt className="col-sm-4">Famille ID:</dt>
              <dd className="col-sm-8">{familleId}</dd>
  
              <dt className="col-sm-4">Baptisé:</dt>
              <dd className="col-sm-8">{baptise ? 'Oui' : 'Non'}</dd>
  
              <dt className="col-sm-4">Tranche d’Âge:</dt>
              <dd className="col-sm-8">{trancheAge}</dd>
            </dl>
          <div className="">
            <button className="btn btn-primary mr-2">Edit</button>
            <button className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
  
  const listeFamille = familles.map((item) => {
    // Filter mambras to include only those that belong to the current family
    const relatedMambras = mambras.filter((mambra) => mambra.familleId === item.id);
  
    return (
      <tr key={item.id}>
        <td className="align-middle">
          <strong>{item.nom}</strong>
        </td>
        <td className="align-middle text-center">
          <span className="badge bg-info text-white">{relatedMambras.length}</span>
        </td>
        <td>
          <ul className="list-unstyled mb-0">
            {relatedMambras.map((i) => (
              <li key={i.id} className="d-flex align-items-center justify-content-between p-2 border-bottom">
                <span>{i.nom} {i.prenom}</span>
                <NavLink className="btn btn-sm btn-outline-success" to={`../../mambra/${i.id}/edit`}>
                  <i className="fas fa-edit me-1"></i> Edit
                </NavLink>
              </li>
            ))}
          </ul>
        </td>
      </tr>
    );
  });
  

  const templateBodyModalExport = () =>  {
    // Check if mambras exists and has at least one item
    if (mambras && mambras.length > 0) {
      const properties = Object.keys(mambras[0]);
      const filteredItems = properties.filter(item => !item.includes('@'));
      const listItems = filteredItems.map(item => (
        <>
          <div className="form-check">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id={`checkbox-${item}`} 
              value={item} 
              onChange={handleSelectionHeaderPdfChange}
            />
            <label className="form-check-label" htmlFor={`checkbox-${item}`}>
              {item}
            </label>
          </div>
        </>
      ));
      return (
        <> 
          <p>Veuillez choisir les entêtes à exporter</p>
            {listItems}
          <div className="mt-3 text-center">
            <button onClick={handleExportPDF} className="btn btn-primary" > Exporter </button>
          </div>
        </>
      );
    }
  
    // Return a loading message or an empty fragment if mambras is undefined or empty
    return <p>Loading...</p>;
  }
  
  const handleSearch = (e) => {
    const search = e.target.value.toLowerCase();
    setFilters(prevNameFilter => {
      return {
        ...prevNameFilter,
        prenom: search
      };
    });
  }



const handleOpenModalExportPDF = () => {
  
  setHeaderExportPdf([]);
  setModalContent(
    {
      title: "Entête pdf à exporter",
      body : templateBodyModalExport()
    }
  );
  setModalIsOpen(true);
  
}

const handleSelectionHeaderPdfChange = (event) => {

  const { value, checked } = event.target;

  setHeaderExportPdf(prevItems => 
    checked 
      ? [...prevItems, value] 
      : prevItems.filter(item => item !== value)
  );
}

const handleExportPDF = () => {

  let headers = headerExportPdf;

  let liste = mambras.map(elt => 
    headers.map(header => {
      if(header == "dateNaissance"){
        return formatDateToFr(elt[header]);
      }else{
       return elt[header];
      }
    })
  );

  ExportPDF([headers],liste,"Liste des mambra");
}

const handleCloseModal = () =>{
  setModalIsOpen(false)
}


  return (
    <>

      <ExportModal modalIsOpen={modalIsOpen} body={modalContent.body} title={modalContent.title} handleCloseModal={handleCloseModal} ></ExportModal>
      <div className="row">
        <div className="col-md-3 ">

        <div className="menu-lateral border border-danger p-3 rounded">
          <h3 className="mb-4">Catégories</h3>
          <ul className="list-unstyled">
            <li
              onClick={() => setToDisplay('mambra')}
              className={`cursor-pointer ${toDisplay === 'mambra' ? 'active text-danger font-weight-bold' : ''}`}
            >
              Mambra
            </li>
            <li
              onClick={() => setToDisplay('famille')}
              className={`cursor-pointer ${toDisplay === 'famille' ? 'active text-danger font-weight-bold' : ''}`}
            >
              Familles
            </li>
            <li className="cursor-pointer">Mambra par famille</li>
          </ul>

          <h3 className="mt-5 mb-4">Filtres <span className="badge bg-danger">{mambras.length}</span></h3>
          <div>
            <Filtres setFilters={setFilters} />
            <button className="btn btn-success mt-3 w-100" onClick={handleOpenModalExportPDF}>
              Exporter liste en PDF
            </button>
          </div>
        </div>

        </div>
        <div className="col-md-9">

                <div class="d-flex justify-content-end">
                  <div class="p-2 bd-highlight">Recherche</div>
                  <div class="p-2 bd-highlight"><input type="text" onChange={handleSearch} className="form-control" /></div>
                </div>
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