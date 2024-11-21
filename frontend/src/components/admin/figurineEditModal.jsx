import React, { useState } from "react";
import { ModalBody, ModalContent, ModalFooter } from "../ui/animated-modal";

const FigurineEditModal = ({ figurine, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: figurine.name || "",
    price: figurine.price || "",
    description: figurine.description || "",
    origin: figurine.origin || "",
    classification: figurine.classification || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Updated Figurine Data:", formData);
    if (onSave) {
      onSave({ ...figurine, ...formData }); // Combine original figurine with updates
    }
    onClose(); // Close the modal
  };

  return (
    <>
      <ModalBody>
        <ModalContent>
          <h2 className="text-2xl font-bold mb-4">Edit Figurine</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Origin</label>
              <input
                type="text"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Classification</label>
              <input
                type="text"
                name="classification"
                value={formData.classification}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
          <button
            className="bg-black text-white px-4 py-2 rounded m-2"
            onClick={handleSubmit}>
            Save
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded m-2"
            onClick={onClose}>
            Cancel
          </button>
        </ModalFooter>
      </ModalBody>
    </>
  );
};

export default FigurineEditModal;
