import { FileTypes } from "../constants/file_types";

const checkFileType = (file: File): FileTypes => {
    if (file.type.startsWith("image/")) return FileTypes.image;
    if (file.type.startsWith("video/")) return FileTypes.video;
    return "unknown";
};

export { checkFileType }