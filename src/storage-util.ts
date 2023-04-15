import mime from "mime";
import {
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import type {
  UploadMetadata,
} from "firebase/storage";

export const uploadImage = (file: File, url: string) => {
  const metadata: UploadMetadata = {
    contentType: mime.getType(file.name) ?? "",
  };
  const storage = getStorage();
  const uploadRef = ref(storage, url);
  return uploadBytes(uploadRef, file, metadata);
};
