import { motion } from 'framer-motion';
import { Mail, MapPin, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';

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
  {
    title: 'Product Designer',
    company: 'Pépinière 27',
    location: 'Paris',
    period: '2022 - Présent',
  },
  {
    title: 'UX/UI Designer',
    company: 'Station F',
    location: 'Paris',
    period: '2021 - 2022',
  },
];

export function About() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-32 pb-20">
        {/* Back Button */}
        <div className="px-4 sm:px-6 lg:px-32 xl:px-48 mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Retour</span>
          </Link>
        </div>

        <div className="px-4 sm:px-6 lg:px-32 xl:px-48">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <motion.div
              className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Photo Placeholder */}
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <span className="text-muted-foreground text-sm">Photo</span>
              </div>
              
              {/* Title & Info */}
              <div className="flex flex-col gap-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight">
                  Rayan Saanoun
                </h1>
                <div className="flex flex-col gap-2 text-muted-foreground">
                  <span className="text-lg">Product Designer</span>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Bordeaux, France</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bio Section */}
            <motion.section
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-2xl sm:text-3xl font-medium mb-6">À propos</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Product Designer basé à Bordeaux, je conçois des expériences digitales centrées sur l'utilisateur 
                  et alignées avec les objectifs business. Fort de plus de 4 ans d'expérience, j'accompagne 
                  startups et entreprises dans la création de produits digitaux innovants.
                </p>
                <p>
                  Ma méthode combine recherche utilisateur rigoureuse, prototypage rapide et itérations basées 
                  sur les retours terrain. Je crois profondément en la collaboration étroite entre designers, 
                  développeurs et stakeholders pour créer des produits cohérents et performants.
                </p>
                <p>
                  Actuellement en poste à la Pépinière 27 à Paris, je continue d'explorer les nouvelles 
                  approches du design produit et du design thinking.
                </p>
              </div>
            </motion.section>

            {/* Services Section */}
            <motion.section
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl sm:text-3xl font-medium mb-6">Services</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {services.map((service, index) => (
                  <motion.div
                    key={service}
                    className="px-4 py-3 bg-muted rounded-lg text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                  >
                    <span className="text-sm font-medium">{service}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Experience Section */}
            <motion.section
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl sm:text-3xl font-medium mb-6">Expérience</h2>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-border"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    <div className="flex flex-col gap-1">
                      <h3 className="text-lg font-medium">{exp.title}</h3>
                      <span className="text-muted-foreground">
                        {exp.company} — {exp.location}
                      </span>
                    </div>
                    <span className="text-muted-foreground text-sm mt-2 sm:mt-0">
                      {exp.period}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Contact CTA */}
            <motion.section
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl sm:text-3xl font-medium mb-4">
                Travaillons ensemble
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Vous avez un projet en tête ? Discutons-en autour d'un café.
              </p>
              <Button asChild size="lg">
                <a href="mailto:rayansaan.pro@gmail.com" className="inline-flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Me contacter
                </a>
              </Button>
            </motion.section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
