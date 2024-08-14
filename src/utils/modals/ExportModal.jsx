import { useState, useEffect } from "react";
import Modal from 'react-modal';

  
function ExportModal({modalIsOpen,title,body,handleCloseModal}){


const customStyles = {
	content: {
	  top: '50%',
	  left: '50%',
	  right: 'auto',
	  bottom: 'auto',
	  marginRight: '-50%',
	  transform: 'translate(-50%, -50%)',
	},
  };
	return(

		<div>
		      <Modal
		        isOpen={modalIsOpen}
		        // onAfterOpen={afterOpenModal}
		        onRequestClose={handleCloseModal}
		        style={customStyles}
		        contentLabel="Example Modal">
		        <h2> {title} </h2>
		       	<div> {body}  </div>
		      </Modal>
	    </div>
	)

}

export default ExportModal;