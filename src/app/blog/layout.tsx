export default function BlogLayout({
  children,
  blog,
}: Readonly<{
  children: React.ReactNode;
  blog: React.ReactNode;
}>) {
  return (
    <>{blog ?? children}</>
  );
}


