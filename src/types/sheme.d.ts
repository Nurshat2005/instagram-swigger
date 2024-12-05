
interface Profile {
  id: string;
  username: string;
  role: string;
  email: string;
  isActive: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
}

interface SignInRes {
  accessToken: string;
  accessTokenExpiration: string;
  refreshToken: string;
}

interface SignInReq {
  email: string;
  password: string;
}

interface SignUpRes {
  message: string;
  accessToken: string;
  accessTokenExpiration: string;
  refreshToken: string;
}

interface SignUpReq {
  email: string;
  password: string;
  username: string;
  photo: string;
}

interface ITokens {
  accessToken: string;
  accessTokenExpiration: string;
  refreshToken: string;
}

interface LogoutResponse {
  message: string;
}
