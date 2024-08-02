import jsPDF from "jspdf";
import "jspdf-autotable";

const ExportPDF = (data ) => {

        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "title";
        const headers = [["Nom", "Prénom"]];
    
        const liste = data.map(elt=> [elt.nom, elt.prenom,]);
    
        let content = {
          startY: 50,
          head: headers,
          body: liste
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("report.pdf");
}
export default ExportPDF;       
