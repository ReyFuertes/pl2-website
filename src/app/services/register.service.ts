import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { IRegisterPayloadDto, IRegisterResponseDto } from '../models/generic.model';

@Injectable({ providedIn: 'root' })
export class RegisterService extends BaseService<IRegisterPayloadDto | IRegisterResponseDto> {
  constructor(http: HttpClient) {
    super(http, 'access');
  }
}
