import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    orderItems: [
        {
          qty: { type: Number, required: true },
          figurine: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Figurine",
          },
        },
      ],
      shippingAddress: {
         type: String, required: true 
      },
      paymentMethod: {
        type: String,
        required: true,
        enum: {
            values: [
               "Cash on Delivery",
            ],
            message: "Please select the correct classification for the figurine",
        },
      },
      shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
      },
      totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
      },
      status: {
        type: String,
        required: true,
        default: false,
      },
      deliveredAt: {
        type: Date,
      },
},{
    timestamps: true,
});

const Order = mongoose.model("Order", orderSchema);
export default Order;