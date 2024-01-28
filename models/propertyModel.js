import mongoose from "mongoose";

const Schema = mongoose.Schema;

const propertySchema = new Schema(
  {
    propertyName: {
      type: String,
      required: true,
    },
    propertyType: {
      type: String,
      required: true,
    },
    address: {
      addressLine1: {
        type: String,
        required: true,
      },
      area: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
    },
    ammenities: {
      AC: {
        type: Boolean,
        default: false,
      },
      Wardrobe: {
        type: Boolean,
        default: false,
      },
      Geyser: {
        type: Boolean,
        default: false,
      },
      WashingMachine: {
        type: Boolean,
        default: false,
      },
      Fan: {
        type: Boolean,
        default: false,
      },
      TV: {
        type: Boolean,
        default: false,
      },
      StudyTable: {
        type: Boolean,
        default: false,
      },
      PowerBackup: {
        type: Boolean,
        default: false,
      },
    },
    propertyOwner: {
      ownerName: {
        type: String,
        required: true,
      },
      ownerContactNumber: {
        type: Number,
        required: true,
      },
    },
    availableFor: {
      type: String,
      // required: true,
    },
    bedType: {
      type: String,
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    propertyImages: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);
export default Property;
