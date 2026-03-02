const socialLinks = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/rayan-saanoun-72baa4146/' },
  { name: 'CV', href: '/cv/CV-Rayan_Saanoun-2025.pdf', download: true },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full px-8 sm:px-12 lg:px-16 pt-16 sm:pt-24 pb-8 sm:pb-10">
      {/* Large Email */}
      <a 
        href="mailto:rayansaan.pro@gmail.com"
        className="block text-footer-email-sm sm:text-footer-email font-medium mb-12 sm:mb-16 transition-opacity duration-200 hover:opacity-70 break-all"
        style={{ 
          lineHeight: '1.1',
          letterSpacing: '-0.02em',
        }}
      >
        rayansaan.pro@gmail.com
      </a>
      
      {/* Bottom Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-8">
        {/* Social Links */}
        <div className="flex items-center gap-4 sm:gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.download ? undefined : "_blank"}
              rel={link.download ? undefined : "noopener noreferrer"}
              download={link.download}
              className="text-sm sm:text-base transition-opacity duration-200 hover:opacity-70"
            >
              {link.name}
            </a>
          ))}
        </div>
        
        {/* Location */}
        <div className="text-sm sm:text-base">
          Bordeaux, France
        </div>
        
        {/* Copyright */}
        <div className="text-sm sm:text-base">
          © {currentYear}
        </div>
      </div>
    </footer>
  );
}
