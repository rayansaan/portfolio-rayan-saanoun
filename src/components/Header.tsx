export function Header() {
  return (
    <header className="w-full px-8 sm:px-12 lg:px-16 py-6 sm:py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 items-start">
        {/* Name */}
        <div className="text-sm sm:text-base font-medium">
          Rayan Saanoun
        </div>
        
        {/* Title */}
        <div className="text-sm sm:text-base hidden md:block">
          Product Designer à Bordeaux
        </div>
        
        {/* Email */}
        <a 
          href="mailto:rayansaan.pro@gmail.com"
          className="text-sm sm:text-base transition-opacity duration-200 hover:opacity-70 md:col-auto col-span-2 md:text-left text-right"
        >
          rayansaan.pro@gmail.com
        </a>
        
        {/* Availability */}
        <div className="text-sm sm:text-base hidden md:block text-right">
          Disponible pour projets
        </div>
      </div>
    </header>
  );
}
