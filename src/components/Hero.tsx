
import { ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContent = () => {
    const contentSection = document.getElementById('content-section');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with parallax effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-nature-50/50 to-background dark:from-nature-950/30 dark:to-background -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-nature-300/20 dark:bg-nature-700/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-nature-200/30 dark:bg-nature-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-6 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className={`transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}
          >
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium">
              AI-Powered Agriculture
            </div>
          </div>
          
          <h1 
            className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 delay-300 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}
          >
            <span className="block">Grow Smarter with</span>
            <span className="text-primary">Precision Agriculture</span>
          </h1>
          
          <p 
            className={`text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto transition-all duration-1000 delay-500 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}
          >
            Get personalized crop recommendations based on your location, soil type, and environmental conditions through our advanced AI technology.
          </p>
          
          <div 
            className={`transition-all duration-1000 delay-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}
          >
            <button
              onClick={scrollToContent}
              className="px-8 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 font-medium"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <button
          onClick={scrollToContent}
          aria-label="Scroll down"
          className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
