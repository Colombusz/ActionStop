import React from "react";
import { ModalBody, ModalContent, ModalFooter } from "../../ui/animated-modal";

const FigurineDeleteModal = ({ figurine, onClose, onConfirm }) => {
  console.log("Figurine to delete:", figurine);
  return (
    <ModalBody>
      <ModalContent>
        {figurine && figurine.length > 1 ? (
          <>
            <p>Are you sure you want to delete the following figurines?</p>
            <ul className="list-disc ml-5">
              {figurine.map((fig) => (
                <li key={fig._id}>
                  <strong>{fig.name}</strong>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>
            Are you sure you want to delete the figurine{" "}
            <strong>{figurine[0]?.name}</strong>? This action cannot be undone.
          </p>
        )}
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
  );
};



export default FigurineDeleteModal;
