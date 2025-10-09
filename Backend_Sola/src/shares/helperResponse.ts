export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: any;

};

export class ResponseHelper {
  static success<T>(message: string, data?: T): ApiResponse<T> {
    return { success: true, message, data };
  }

  static error(message: string, error?: any): ApiResponse<null> {
    return { success: false, message, error,};
  }
}