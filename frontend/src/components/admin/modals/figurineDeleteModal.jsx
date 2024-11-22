import React from "react";
import { ModalBody, ModalContent, ModalFooter } from "../../ui/animated-modal";

const FigurineDeleteModal = ({ figurine, onClose, onConfirm }) => {
  // console.log("Figurine to delete:", figurine);
  return (
    <>
      <ModalBody>
        <ModalContent>
          <p>
            Are you sure you want to delete the figurine{" "}
            <strong>{figurine?.name}</strong>? This action cannot be undone.
          </p>
        </ModalContent>
        <ModalFooter>
          <button
            className="m-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800 transition"
            onClick={onConfirm}
          >
            Delete
          </button>
          <button
            className="m-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-800 transition"
            onClick={onClose}
          >
            Cancel
          </button>
        </ModalFooter>
      </ModalBody>
    </>
  );
};

export default FigurineDeleteModal;