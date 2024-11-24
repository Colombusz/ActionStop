import React from "react";
import { ModalBody, ModalContent, ModalFooter } from "../../ui/animated-modal";

const DocumentDeleteModal = ({ document, onClose, onConfirm }) => {
  console.log("Review to delete:", document);

  return (
    <ModalBody>
      <ModalContent>
        <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
        <p>
          Are you sure you want to delete this review? This action cannot be undone.
        </p>
        <div className="mt-4 bg-gray-100 p-4 rounded-md">
          <p>
            <strong className="mr-20">ID:</strong> {document?._id}
          </p>
          <p>
            <strong className="mr-14">Rating:</strong> {document?.rating}
          </p>
          <p>
            <strong className="mr-7">Comment:</strong> {document?.comment}
          </p>
          <p>
            <strong className="mr-16">User: </strong> {document?.user}
          </p>
          <p>
            <strong className="mr-11">Figurine:</strong> {document?.figurine}
          </p>
          <p>
            <strong className="mr-6">Created At:</strong>{" "}
            {new Date(document?.createdAt).toLocaleString()}
          </p>
          <p>
            <strong className="mr-5">Updated At:</strong>{" "}
            {new Date(document?.updatedAt).toLocaleString()}
          </p>
        </div>
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

export default DocumentDeleteModal;
