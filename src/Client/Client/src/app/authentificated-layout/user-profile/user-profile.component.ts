import { Component, OnInit} from '@angular/core';
import { HttpService } from '../../services/http-service-provider.service';
import { UserResponse } from '../../models/responses/userResponse';
import { AccountService } from '../../services/account.service';
import { UserService} from '../../services/user-service.service';
import { UpdateProfileRequest } from '../../models/requests/updateProfileRequest';
import { MatSnackBar } from '@angular/material/snack-bar';
import { v4 as uuidv4 } from 'uuid';
import { UpdateProfilePictureRequest, UploadType } from '../../models/requests/profilePictureRequest';
import Pica from 'pica';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user!: UserResponse;
  constructor(private snackBar: MatSnackBar, private accountService: AccountService, private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    await this.loadData();
  }

  async loadData(): Promise<void> {
    try {
      let response$ = await this.userService.getById();
      if (response$.succeeded)
        this.user = response$.data;
    } catch (error) {
      console.error(error);
    }
  }

  async UpdateProfile(): Promise<void> {
    let req!: UpdateProfileRequest;
    req.email = this.user.email;
    req.firstName = this.user.firstName;
    req.lastName = this.user.lastName;
    req.phoneNumber = this.user.phoneNumber;
    let response$ = await this.accountService.updateProfile(req);
    if (response$.succeeded) {
      this.snackBar.open(response$.messages[0]);
    }
  }

  async uploadFile(event: Event): Promise<void> {
    const element = event.currentTarget as HTMLInputElement;
    let file = element.files?.item(0);

    if (file) {
      const extension = file.name.split('.').pop();
      const fileName = `${this.user.id}-${uuidv4()}.${extension}`;
      const format = 'image/png'; // Desired format

      // Resize the image if necessary (using a third-party library like pica)
      const resizedImage = await this.resizeImage(file, 400, 400, format);

      // Convert the resized image file to a byte array or Base64 string
      const data = await this.convertFileToByteArray(resizedImage);

      const request: UpdateProfilePictureRequest = {
        data: data,
        fileName: fileName,
        extension: extension,
        uploadType: UploadType.Picture // Assuming you have defined this enum
      };

      try {
        const result = await this.accountService.updateProfilePictureAsync(request);
        if (result.succeeded) {
          await this.loadData();
        } else {
          result.messages.forEach(error => {
            // Handle each error
          });
        }
      } catch (error) {
        // Handle request error
      }
    }
  }

 

async resizeImage(file: File, width: number, height: number, format: string): Promise <File> {
  const pica = Pica();

  return new Promise((resolve, reject) => {
    // Create an image element
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      // Create a canvas element to resize the image
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      // Resize the image
      pica.resize(img, canvas)
        .then((result: any) => pica.toBlob(result, format)) // Convert the canvas to a Blob
        .then((blob: BlobPart) => {
          // Convert the Blob to a File
          const resizedFile = new File([blob], file.name, {
            type: format,
            lastModified: Date.now()
          });
          resolve(resizedFile);
        })
        .catch(reject);
    };
    img.onerror = reject;
  });
}

  async convertFileToByteArray(file: File): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const byteArray = new Uint8Array(arrayBuffer);
        resolve(byteArray);
      };
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException("Problem parsing input file."));
      };

      reader.readAsArrayBuffer(file);
    });
  }
}
