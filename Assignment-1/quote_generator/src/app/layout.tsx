import './globals.css'

export const metadata = {
  title: 'Quote Generator | Nexium Internship',
  description: 'Generate inspiring quotes using modern Next.js + ShadCN stack.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  )
}