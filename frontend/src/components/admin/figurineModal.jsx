import React, { useEffect } from "react";
import { Modal, ModalBody, ModalContent, ModalFooter, useModal } from "../ui/animated-modal";
import { AnimatedTestimonials } from "../ui/animated-testimonial";

const FigurineModal = ({ figurine, onClose }) => {
    console.log("Figurine Images:", figurine.images);
  
    const testimonials = figurine.images.map(image => ({
      src: image.url,
      name: figurine.name || "Unknown",
      designation: figurine.origin || "N/A",
      quote: figurine.description || "No description provided.",
    }));
  
    return (
      <>
        <ModalBody>
          <ModalContent>
            <h2 className="text-2xl font-bold mb-4">{figurine.name}</h2>
            <p><strong>Price:</strong> <span className="ml-2">₱ {figurine.price}</span></p>
            <p><strong>Description:</strong> <span className="ml-2">{figurine.description || "N/A"}</span></p>
            <p><strong>Origin:</strong> <span className="ml-2">{figurine.origin}</span></p>
            <p><strong>Classification:</strong> <span className="ml-2">{figurine.classification}</span></p>
  
            <AnimatedTestimonials testimonials={testimonials} />
          </ModalContent>
          <ModalFooter>
            <button
              className="bg-black text-white px-4 py-2 rounded m-2"
              onClick={onClose}>
              Close
            </button>
          </ModalFooter>
        </ModalBody>
      </>
    );
  };
  
export default FigurineModal;