export interface RegisterUserRequest {
  firstName: string; // Required
  lastName: string; // Required
  email: string; // Required and should be a valid email format
  userName: string; // Required, minimum length: 6
  password: string; // Required, minimum length: 6
  confirmPassword: string; // Required
  phoneNumber?: string; // Optional (nullable)
  activateUser: boolean; // Boolean value
  autoConfirmEmail: boolean; // Boolean value
}
