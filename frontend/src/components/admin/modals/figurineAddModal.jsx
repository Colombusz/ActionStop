import React from "react";
import { ModalBody, ModalContent, ModalFooter } from "../../ui/animated-modal";
import { useFigurineStore } from "../../store/zfigurine";
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    price: Yup.number().required('Price is required').positive('Price must be positive'),
    description: Yup.string().required('Description is required'),
    origin: Yup.string().required('Origin is required'),
    classification: Yup.string().required('Classification is required'),
    manufacturer: Yup.object({
        name: Yup.string().required('Manufacturer name is required'),
        country: Yup.string().required('Manufacturer country is required'),
    }),
    images: Yup.array().min(1, 'At least one image is required'),
    stock: Yup.number().required('Stock is required').positive('Stock must be positive'),
});

const FigurineAddModal = ({ onClose, onSave }) => {
    const { createFigurine } = useFigurineStore();

    const formik = useFormik({
        initialValues: {
            name: "",
            price: "",
            description: "",
            origin: "",
            stock: "",
            classification: "",
            manufacturer: {
                name: "",
                country: "",
            }, 
            images: [],
        },
        validationSchema,
        onSubmit: async (values) => {
            const newData = new FormData();
            newData.append("name", values.name);
            newData.append("price", values.price);
            newData.append("description", values.description);
            newData.append("origin", values.origin);
            newData.append("stock", values.stock);
            newData.append("classification", values.classification);
            newData.append("manufacturer.name", values.manufacturer.name);
            newData.append("manufacturer.country", values.manufacturer.country);

            values.images.forEach((file) => {
                newData.append("images", file);
            });

            // console.log("Values of figurines name:", values.name, "Price:", values.price, "Description:", values.description, "Origin:", values.origin, "Classification:", values.classification, "Manufacturer:", values.manufacturer, "Images:", values.images);
            // console.log("New Figurine name:", newData.get("name"), "Price:", newData.get("price"), "Description:", newData.get("description"), "Origin:", newData.get("origin"), "Classification:", newData.get("classification"), "Manufacturer Name:", newData.get("manufacturer.name"), "Manufacturer Country:", newData.get("manufacturer.country"), "Images:", newData.getAll("images"));

            try {
                const result = await createFigurine(newData);
                if (!result.success) {
                    toast.error(result.message || "Failed to add figurine.", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    onSave();
                } else {
                    toast.success("Product added successfully!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    onClose();
                }
            } catch (error) {
                console.error("Error adding figurine:", error);
                toast.error("An error occurred while adding the figurine.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        },
    });

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        formik.setFieldValue('images', [...formik.values.images, ...files]);
    };

    const handleImageRemove = (index) => {
        const updatedImages = [...formik.values.images];
        updatedImages.splice(index, 1);
        formik.setFieldValue('images', updatedImages);
    };

    return (
        <>
            <ModalBody>
                <ModalContent className="overflow-y-auto max-h-[80vh]">
                    <h2 className="text-2xl font-bold mb-4">Add Figurine</h2>
                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full px-3 py-2 border rounded"
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="text-red-500 text-sm">{formik.errors.name}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Price ($)</label>
                            <input
                                type="number"
                                name="price"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full px-3 py-2 border rounded"
                            />
                            {formik.touched.price && formik.errors.price ? (
                                <div className="text-red-500 text-sm">{formik.errors.price}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full px-3 py-2 border rounded"
                            />
                            {formik.touched.description && formik.errors.description ? (
                                <div className="text-red-500 text-sm">{formik.errors.description}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Origin</label>
                            <input
                                type="text"
                                name="origin"
                                value={formik.values.origin}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full px-3 py-2 border rounded"
                            />
                            {formik.touched.origin && formik.errors.origin ? (
                                <div className="text-red-500 text-sm">{formik.errors.origin}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Classification</label>
                            <select
                                name="classification"
                                value={formik.values.classification}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full px-3 py-2 border rounded"
                            >
                                <option value="Western">Western</option>
                                <option value="Anime">Anime</option>
                                <option value="Manga">Manga</option>
                                <option value="Fantasy">Fantasy</option>
                                <option value="Other">Other</option>
                            </select>
                            {formik.touched.classification && formik.errors.classification ? (
                                <div className="text-red-500 text-sm">{formik.errors.classification}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Manufacturer Name</label>
                            <input
                                type="text"
                                name="manufacturer.name"
                                value={formik.values.manufacturer.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full px-3 py-2 border rounded"
                            />
                            {formik.touched.manufacturer?.name && formik.errors.manufacturer?.name ? (
                                <div className="text-red-500 text-sm">{formik.errors.manufacturer.name}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Manufacturer Country</label>
                            <input
                                type="text"
                                name="manufacturer.country"
                                value={formik.values.manufacturer.country}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full px-3 py-2 border rounded"
                            />
                            {formik.touched.manufacturer?.country && formik.errors.manufacturer?.country ? (
                                <div className="text-red-500 text-sm">{formik.errors.manufacturer.country}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Stock</label>
                            <input
                                type="number"
                                name="stock"
                                value={formik.values.stock}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full px-3 py-2 border rounded"
                            />
                            {formik.touched.stock && formik.errors.stock ? (
                                <div className="text-red-500 text-sm">{formik.errors.stock}</div>
                            ) : null}
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
                            {formik.touched.images && formik.errors.images ? (
                                <div className="text-red-500 text-sm">{formik.errors.images}</div>
                            ) : null}
                            <div className="mt-2 grid grid-cols-3 gap-4">
                                {formik.values.images.map((image, index) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={URL.createObjectURL(image)}
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
                        <ModalFooter>
                            <button
                                type="submit"
                                className="bg-black text-white px-4 py-2 rounded m-2"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                className="bg-gray-500 text-white px-4 py-2 rounded m-2"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </ModalBody>
        </>
    );
};

export default FigurineAddModal;