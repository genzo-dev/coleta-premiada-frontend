export function getGoogleLoginUrl() {
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    redirect_uri: `${appUrl}/auth/callback`,
    response_type: "code",
    scope: "openid email profile",
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}
