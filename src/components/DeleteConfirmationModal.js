import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteConfirmationModal = ({ show, onHide, onConfirm, company }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-light">
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete your experience at <strong>{company}</strong>?</p>
        <p className="text-danger">This action cannot be undone.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete Experience
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;