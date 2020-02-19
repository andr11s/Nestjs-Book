import { RoleType } from '../role/rolestypes.enum';

export class IJwtPayload {
  id: Number;
  username: string;
  email: string;
  roles: RoleType[];
  iat? = Date;
}
