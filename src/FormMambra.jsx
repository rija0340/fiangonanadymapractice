function FormMambra({handleFormSubmit}){
    return (
        <div>
            <form action="" onSubmit={handleFormSubmit}>
                <label htmlFor="nom">Nom</label>
                <input type="text" name="nom" className="form-control mb-2" />
                <label htmlFor="prenom">Prenom</label>
                <input type="text" name="prenom" className="form-control mb-2" />
                <button type="submit" className="btn btn-outline-primary"  >Enregistrer</button>
            </form>

        </div>
    );
}
export default FormMambra;