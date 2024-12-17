export default function PreconnectLinks() {
  return (
    <>
      <link
        rel="preconnect"
        href="https://api.qurancdn.com"
        crossOrigin="anonymous"
      />
      <link
        rel="preconnect"
        href="https://everyayah.com"
        crossOrigin="anonymous"
      />
      <link
        rel="dns-prefetch"
        href="https://api.qurancdn.com"
      />
      <link
        rel="dns-prefetch"
        href="https://everyayah.com"
      />
    </>
  );
}