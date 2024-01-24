import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { HttpService } from '../../services/http-service-provider.service';
import { UserResponse } from '../../models/responses/userResponse';
import { AccountService } from '../../services/account.service';
import { UserService} from '../../services/user-service.service';
import { UpdateProfileRequest } from '../../models/requests/updateProfileRequest';
import { UpdateProfilePictureRequest, UploadType } from '../../models/requests/profilePictureRequest';
import Pica from 'pica';
import { CustomSnackbarService } from '../../services/snack-bar.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user!: UserResponse;
  profilePictureData!: string;
  @ViewChild('profilePicture') fileInput!: ElementRef<HTMLInputElement>;
  isLoading = true;
  constructor(private snackBar: CustomSnackbarService, private accountService: AccountService, private userService: UserService) { }


  async ngOnInit(): Promise<void> {
    try {
      await this.loadData();
    } finally {
      this.isLoading = false;
    }
  }

  async loadData(): Promise<void> {
    try {
      let response$ = await this.userService.getById();
      if (response$.succeeded) {
        this.user = response$.data;
        let response2$ = await this.accountService.getProfilePictureAsync();
        if (response2$.succeeded && response2$.data) {
          this.profilePictureData = response2$.data;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async updateProfile(): Promise<void> {
    let req: UpdateProfileRequest = {
      email: this.user.email,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      phoneNumber: this.user.phoneNumber,
    };
    let response$ = await this.accountService.updateProfile(req);
    if (!response$.succeeded) {
      this.snackBar.openSnackBar('Profile updated successfuly!', 'success');
    }else
      this.snackBar.openSnackBar(response$.messages[0], 'error');
  }

  async uploadFile(event: Event): Promise<void> {
    const element = event.currentTarget as HTMLInputElement;
    let file = element.files?.item(0);

    if (file) {
      const extension = file.name.split('.').pop();
      const fileName = `${this.user.id}.${extension}`;
      const format = 'image/png'; 
      const resizedImage = await this.resizeImage(file, 400, 400, format);
      
      const data = await this.convertFileToBase64(resizedImage);

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
            this.snackBar.openSnackBar(error, 'error');
          });
        }
      } catch (error) {
        
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
        .then((result: any) => pica.toBlob(result, format))
        .then((blob: BlobPart) => {
          
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

  async convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException("Problem parsing input file."));
      };

      reader.readAsDataURL(file);
    });
  }
}
