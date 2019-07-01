export interface IStuffLoginUser {
  id_token: string;
  access_token: string;
  profile: {
    sub: string;
    auth_time: number;
    kid: string;
    jti: string;
    name: string;
    preferred_username: string;
    given_name: string;
    family_name: string;
    nickname: string;
    profile: string;
    picture: string;
    gender: string;
    locale: string;
    birthdate: string;
  };
}
