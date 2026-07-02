export function getGoogleLoginUrl() {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_API_URL}/auth/callback`,
    response_type: "code",
    scope: "openid email profile",
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}
