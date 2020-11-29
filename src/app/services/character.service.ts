import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { IRegisterPayloadDto, IRegisterResponseDto } from '../models/generic.model';
import { IChangePassword } from '../models/detail.model';

@Injectable({ providedIn: 'root' })
export class CharacterService extends BaseService<any> {
  constructor(http: HttpClient) {
    super(http, 'character');
  }
}
