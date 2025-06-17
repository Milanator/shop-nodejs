import multer from "multer";
import { INPUT_FIELD_DESTINATION } from "./../constants.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, INPUT_FIELD_DESTINATION);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + `-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export default multer({ storage }).single("image");
