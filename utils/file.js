import fs from "fs";

export const deleteFile = (path) => {
  fs.unlink(path, (exception) => {
    if (exception) {
      throw new Error(exception);
    }
  });
};
