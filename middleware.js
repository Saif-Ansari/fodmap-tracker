export const config = {
  matcher: '/:path*',
};

export default function middleware(request) {
  const authorization = request.headers.get('Authorization');

  if (authorization) {
    const [scheme, encoded] = authorization.split(' ');
    if (scheme === 'Basic') {
      const decoded = atob(encoded);
      const pwd = decoded.slice(decoded.indexOf(':') + 1);
      if (pwd === process.env.APP_PASSWORD) {
        return; // correct password — serve the app
      }
    }
  }

  return new Response('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Gut Tracker"' },
  });
}
