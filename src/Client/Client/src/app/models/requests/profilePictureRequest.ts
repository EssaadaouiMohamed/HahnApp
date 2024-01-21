
export enum UploadType {
  Picture,

}

export interface UpdateProfilePictureRequest {
  fileName?: string;
  extension?: string;
  uploadType: UploadType;
  data?: string;
}
