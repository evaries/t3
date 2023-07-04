import { generateComponents } from "@uploadthing/react";

import { OurFileRouter } from "y/server/uploadthing";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();
