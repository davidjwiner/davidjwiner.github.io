import type { SVGProps } from 'react';

import { site } from '@/lib/site';

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.19-3.37-1.19-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.55 9.55 0 0 1 12 6.99c.85 0 1.7.11 2.5.34 1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.02 1.59 1.02 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M17.53 3h3.07l-6.7 7.66L21.8 21h-6.18l-4.84-6.33L5.24 21H2.16l7.17-8.2L1.75 3h6.34l4.37 5.78L17.53 3Zm-1.08 16.18h1.7L7.17 4.72H5.34l11.11 14.46Z" />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.68h3.95V21H3V9.68Zm6.32 0h3.78v1.55h.05c.53-1 1.82-2.05 3.75-2.05 4.01 0 4.75 2.64 4.75 6.07V21H17.7v-5.1c0-1.22-.02-2.78-1.69-2.78-1.7 0-1.96 1.32-1.96 2.69V21H10.1V9.68h-.78Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <ul className="social-links" aria-label="Social links">
        <li>
          <a href={`https://github.com/${site.github}`} aria-label="GitHub" title="GitHub">
            <GitHubIcon className="social-icon" />
            <span className="sr-only">GitHub</span>
          </a>
        </li>
        <li>
          <a href={`https://x.com/${site.twitter}`} aria-label="X" title="X">
            <XIcon className="social-icon" />
            <span className="sr-only">X</span>
          </a>
        </li>
        <li>
          <a href={`https://linkedin.com/in/${site.linkedin}`} aria-label="LinkedIn" title="LinkedIn">
            <LinkedInIcon className="social-icon" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </li>
      </ul>
    </footer>
  );
}
