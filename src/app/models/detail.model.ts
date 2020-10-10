import { AuthType } from './generic.model';

export interface IResponseDetail {
  account_name?: string,
  detail: Array<{
    account_name?: string;
    char_name?: string;
    level?: string;
    maxHp?: string;
    curHp?: string;
    maxCp?: string;
    maxMp?: string;
    curMp?: string;
    exp?: string;
    onlinetime?: string;
  }>,
  status: AuthType
}