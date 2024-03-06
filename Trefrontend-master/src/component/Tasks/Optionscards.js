  import React from 'react';
  import Modal from 'react-modal';
  import { ImCross } from 'react-icons/im';
  import './optionalcard.scss';

  Modal.setAppElement('#root'); 

  export default function Optionscards({ isOpen, onClose }) {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Options Card Modal"
        className="custom-modal"
        style={{
          content: {
            // Add your custom styles here
            position: 'absolute',
            top:'20%',
            left:'30%',
            width:'30%',
            background:"#ebecf0",
            border:'none',
            borderRadius:"1rem",
            justifyContent:"center"
          },
          overlay: {
            // Add styles for the overlay here
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          },
        }}
      >
        <div >
          <div className="optional-card-title">
            List actions
            <div className="closing-options" onClick={onClose}>
              <ImCross />
            </div>
          </div>
          <div className="body-card-options">
            <ul>
              <div className="optional-card-option">Add card...</div>
              <div className="optional-card-option">Copy list...</div>
              <div className="optional-card-option">Move list...</div>
              <div className="optional-card-option">watch</div>
            </ul>
          </div>
        </div>
      </Modal>
    );
  }
