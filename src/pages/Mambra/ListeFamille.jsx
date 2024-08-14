import { NavLink } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import { useState, useEffect } from "react";
import ExportPDF from "../../utils/ExportPDF";
import ExportModal from "../../utils/modals/ExportModal";
import Filtres from "./utils/Filtres";
import { formatDateToFr } from "../../utils/FormatDate";

export default function ListeFamille() {

  const [filters, setFilters] = useState({
    nom: "",
    prenom: "",
    sexe: "",
    baptise: "",
    trancheAge: [],
    orderByName : ""
  });

  const { data: familles, loading: loadingFamille, error: errorFamilles } = useFetchData("http://localhost:8000/apip/familles",filters);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [headerExportPdf, setHeaderExportPdf] = useState([]);

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

const handleOpenModalExportPDF = () => {
  
  setHeaderExportPdf([]);
  setModalIsOpen(true);
  
}

const handleCloseModal = () =>{
  setModalIsOpen(false)
}
  return (
    <>
      <div className="row">
        <div className="col-md-3 ">

          <div className="menu-lateral border border-danger">

            <h3>Filtres ()</h3>
            <div>
            <Filtres setFilters={setFilters} ></Filtres>
            <button className="btn btn-success"  onClick={handleOpenModalExportPDF} > Exporter liste en pdf </button>
            </div>
          </div>

        </div>
        <div className="col-md-9">
        <div class="d-flex justify-content-end">
                  <div class="p-2 bd-highlight">Recherche</div>
                  <div class="p-2 bd-highlight"><input type="text" onChange={handleSearch} className="form-control" /></div>
                </div>
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
        </div>
      </div>

    </>
  );
}