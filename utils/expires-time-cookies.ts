export const accessTokenExpires =
  Number(process.env.JWT_ACCESS_COOKIE_TTL) * 1000;
export const refreshTokenExpires =
  Number(process.env.JWT_REFRESH_COOKIE_TTL) * 1000;
