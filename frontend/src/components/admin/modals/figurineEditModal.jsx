import React, { useState } from "react";
import { ModalBody, ModalContent, ModalFooter } from "../../ui/animated-modal";
import { useFigurineStore } from "../../store/zfigurine";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Loading from "../../common/loading";

const FigurineEditModal = ({ figurine, onClose, onSave }) => {
  const { updateFigurine } = useFigurineStore();
  const [loading, setLoading] = useState(false);

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    price: Yup.number()
      .required("Price is required")
      .min(0, "Price must be greater than or equal to 0"),
    stock: Yup.number()
      .required("Stock is required")
      .min(0, "Stock must be greater than or equal to 0"),
    description: Yup.string().required("Description is required"),
    origin: Yup.string().required("Origin is required"),
    classification: Yup.string().required("Classification is required"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);

    const updatedData = new FormData();
    updatedData.append("name", values.name);
    updatedData.append("price", values.price);
    updatedData.append("stock", values.stock);
    updatedData.append("description", values.description);
    updatedData.append("origin", values.origin);
    updatedData.append("classification", values.classification);

    // Append images if any
    values.images.forEach((file) => {
      updatedData.append("images", file);
    });

    try {
      const result = await updateFigurine(figurine._id, updatedData);
      if (!result.success) {
        toast.error(result.message || "Failed to update figurine.", {
          position: "top-right",
          autoClose: 5000,
        });
      } else {
        toast.success("Product updated successfully!", {
          position: "top-right",
          autoClose: 5000,
        });
        onSave(); // Trigger parent save action
        onClose(); // Close the modal
      }
    } catch (error) {
      console.error("Error updating figurine:", error);
      toast.error("An error occurred while updating the figurine.", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ModalBody>
        <ModalContent className="overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Edit Figurine</h2>
          <Formik
            initialValues={{
              name: figurine.name || "",
              price: figurine.price || 0,
              stock: figurine.stock || 0,
              description: figurine.description || "",
              origin: figurine.origin || "",
              classification: figurine.classification || "",
              images: [],
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, values }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <Field
                    type="text"
                    name="name"
                    className="w-full px-3 py-2 border rounded"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price ($)</label>
                  <Field
                    type="number"
                    name="price"
                    className="w-full px-3 py-2 border rounded"
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Stock</label>
                  <Field
                    type="number"
                    name="stock"
                    className="w-full px-3 py-2 border rounded"
                  />
                  <ErrorMessage
                    name="stock"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Field
                    as="textarea"
                    name="description"
                    className="w-full px-3 py-2 border rounded"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Origin</label>
                  <Field
                    type="text"
                    name="origin"
                    className="w-full px-3 py-2 border rounded"
                  />
                  <ErrorMessage
                    name="origin"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Classification</label>
                  <Field
                    as="select"
                    name="classification"
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="">Select Classification</option>
                    <option value="Western">Western</option>
                    <option value="Anime">Anime</option>
                    <option value="Manga">Manga</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="classification"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Upload Images</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) =>
                      setFieldValue("images", Array.from(e.target.files))
                    }
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer focus:outline-none"
                  />
                  <div className="mt-2 grid grid-cols-3 gap-4">
                    {values.images.map((file, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updatedImages = [...values.images];
                            updatedImages.splice(index, 1);
                            setFieldValue("images", updatedImages);
                          }}
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
              </Form>
            )}
          </Formik>
        </ModalContent>
      </ModalBody>
      <Loading loading={loading} />
    </>
  );
};

export default FigurineEditModal;
