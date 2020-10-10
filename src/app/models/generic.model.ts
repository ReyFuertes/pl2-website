
export class IRegisterPayloadDto {
  login: string;
  password: string;
}
export class ILoginPayloadDto {
  login: string;
  password: string;
}
export class IRegisterResponseDto {
  status: AuthType;
}
export enum AuthType {
  success = 'success',
  failed = 'failed'
}