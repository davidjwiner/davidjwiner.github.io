import { site } from '@/lib/site';

export function Footer() {
  return (
    <footer className="site-footer">
      <ul className="social-links" aria-label="Social links">
        <li>
          <a href={`https://github.com/${site.github}`}>GitHub</a>
        </li>
        <li>
          <a href={`https://twitter.com/${site.twitter}`}>Twitter</a>
        </li>
        <li>
          <a href={`https://linkedin.com/in/${site.linkedin}`}>LinkedIn</a>
        </li>
      </ul>
    </footer>
  );
}
