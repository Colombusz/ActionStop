import React, { useState } from "react";
import { ModalBody, ModalContent, ModalFooter } from "../../ui/animated-modal";
import { useFigurineStore } from "../../store/zfigurine"; 
import { toast } from 'react-toastify';
import Loading from "../../common/loading";

const FigurineEditModal = ({ figurine, onClose, onSave }) => {
    const [loading, setLoading] = useState(false);
    const { updateFigurine } = useFigurineStore();

    const [formData, setFormData] = useState({
        name: figurine.name || "",
        price: figurine.price || "",
        description: figurine.description || "",
        origin: figurine.origin || "",
        classification: figurine.classification || "",
        images: [], // Array to store raw files
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prev) => ({
            ...prev,
            images: [...prev.images, ...files],
        }));
    };

    const handleImageRemove = (index) => {
        setFormData((prev) => {
            const updatedImages = [...prev.images];
            updatedImages.splice(index, 1);
            return { ...prev, images: updatedImages };
        });
    };
  
    const handleSubmit = async () => {
        setLoading(true);
        const updatedData = new FormData();
    
        updatedData.append("name", formData.name);
        updatedData.append("price", formData.price);
        updatedData.append("description", formData.description);
        updatedData.append("origin", formData.origin);
        updatedData.append("classification", formData.classification);
    
        formData.images.forEach((file) => {
          updatedData.append("images", file); // Append raw files to FormData
        });
    
        try {
          const result = await updateFigurine(figurine._id, updatedData);
          if (!result.success) {
            toast.error(result.message || "Failed to update figurine.", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.success("Product updated successfully!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            onSave(); // Trigger parent save action
            onClose(); // Close the modal
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
          console.error("Error updating figurine:", error);
          toast.error("An error occurred while updating the figurine.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
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
              <select
                name="classification"
                value={formData.classification}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="Western">Western</option>
                <option value="Anime">Anime</option>
                <option value="Manga">Manga</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Upload Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer focus:outline-none"
              />
              <div className="mt-2 grid grid-cols-3 gap-4">
                {formData.images.map((image, index) => (
                <div key={index} className="relative group">
                    <img
                    src={URL.createObjectURL(image)} // Use 'image' here
                    alt="Preview"
                    className="w-full h-32 object-cover rounded"
                    />
                    <button
                    type="button"
                    onClick={() => handleImageRemove(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                    ✕
                    </button>
                </div>
                ))}
              </div>
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
          <button
            className="bg-black text-white px-4 py-2 rounded m-2"
            onClick={handleSubmit}
          >
            Save
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded m-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </ModalFooter>
      </ModalBody>
      <Loading loading={loading} />
    </>
  );
};

export default FigurineEditModal;
