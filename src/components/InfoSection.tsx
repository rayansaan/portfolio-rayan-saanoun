const services = [
  'UX Research',
  'UX/UI Design',
  'Design System',
  'Prototyping',
  'Design Thinking',
  'Product Strategy',
  'User Testing',
  'Workshop Facilitation',
];

const experiences = [
  'Pépinière 27 - Paris',
  'Station F - Paris',
];

export function InfoSection() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-32 xl:px-48 py-16 sm:py-24 border-t border-gray-300/30 dark:border-gray-700/30">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
        {/* Services Column */}
        <div>
          <h3 className="text-sm sm:text-base mb-6 sm:mb-8">Services</h3>
          <ul className="space-y-1">
            {services.map((service) => (
              <li 
                key={service} 
                className="text-base leading-relaxed"
              >
                {service}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Experience Column */}
        <div>
          <h3 className="text-sm sm:text-base mb-6 sm:mb-8">Expérience</h3>
          <ul className="space-y-1">
            {experiences.map((exp) => (
              <li 
                key={exp} 
                className="text-base leading-relaxed"
              >
                {exp}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Bio Column */}
        <div className="md:col-span-2 lg:col-span-1">
          <h3 className="text-sm sm:text-base mb-6 sm:mb-8">Bio</h3>
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              Product Designer à Bordeaux, France. Avec plus de 4 ans d'expérience en tant que Product Designer, j'ai travaillé auprès de startups, de clients B2B et B2C, à la fois en freelance et en équipe.
            </p>
            <p>
              Je combine une solide expertise en design thinking, en design system et en product design, avec un sens aigu des enjeux utilisateurs. J'aime explorer, apprendre et imaginer des solutions qui ont du sens et de l'impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
