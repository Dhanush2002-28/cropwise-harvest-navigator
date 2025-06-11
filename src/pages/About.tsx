
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Lightbulb, Users, Globe } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-nature-300/20 dark:bg-nature-700/10 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-nature-200/30 dark:bg-nature-600/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium animate-fade-in">
                Our Story
              </div>
              <h1
                className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in"
                style={{ animationDelay: "200ms" }}
              >
                Revolutionizing Agriculture Through Intelligence
              </h1>
              <p
                className="text-lg text-muted-foreground mb-8 animate-fade-in"
                style={{ animationDelay: "400ms" }}
              >
                AgriVision was founded with a vision to make precision
                agriculture accessible to everyone, from small-scale farmers to
                large agricultural enterprises.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="aspect-square rounded-2xl overflow-hidden bg-nature-100 dark:bg-nature-900 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-nature-100/80 to-nature-300/50 dark:from-nature-800/80 dark:to-nature-600/30"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Replace Leaf icon with AgriVision logo */}
                      <img 
                        src="/lovable-uploads/28a87d9e-bf3b-4021-bd55-6a7c87f2f8f3.png" 
                        alt="AgriVision Logo" 
                        className="w-50 h-50 object-contain rounded-3xl" 
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                  <p className="text-muted-foreground mb-6">
                    At AgriVision, we believe that technology can transform
                    agriculture for the better. Our mission is to empower
                    farmers with data-driven insights that help them make more
                    informed decisions, increase crop yields, and promote
                    sustainable farming practices.
                  </p>
                  <p className="text-muted-foreground">
                    By combining artificial intelligence with agricultural
                    expertise, we're creating a platform that adapts to each
                    farmer's unique needs and environmental conditions. Our goal
                    is to contribute to a world where food production is
                    efficient, profitable, and environmentally responsible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium">
                  Our Values
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  What Drives Us
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our core values shape everything we do at AgriVision.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass p-8 rounded-xl card-shine">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Lightbulb className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                  <p className="text-muted-foreground">
                    We constantly push the boundaries of what's possible in
                    agricultural technology, developing new solutions to age-old
                    farming challenges.
                  </p>
                </div>

                <div className="glass p-8 rounded-xl card-shine">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
                  <p className="text-muted-foreground">
                    We're committed to promoting farming practices that protect
                    our planet while ensuring food security for future
                    generations.
                  </p>
                </div>

                <div className="glass p-8 rounded-xl card-shine">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
                  <p className="text-muted-foreground">
                    We believe advanced agricultural technology should be
                    available to all farmers, regardless of the size of their
                    operation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium">
                  Our Team
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  The Minds Behind AgriVision
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our diverse team combines expertise in agriculture, data
                  science, and technology.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Team member cards would go here - using placeholders */}
                {[
                  { name: "Dhanush C", role: "Student" },
                  { name: "Sumit Singha Chowdhury", role: "Assistant Professor" },
                  
                ].map((member, index) => (
                  <div
                    key={index}
                    className="glass rounded-xl overflow-hidden card-shine"
                  >
                    <div className="aspect-video bg-gradient-to-br from-nature-200 to-nature-300 dark:from-nature-800 dark:to-nature-700 flex items-center justify-center">
                      <Users className="w-12 h-12 text-background/80" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-lg mb-1">
                        {member.name}
                      </h3>
                      <p className="text-primary text-sm mb-3">{member.role}</p>
                      <p className="text-muted-foreground text-sm">
                        Passionate about using technology to solve agricultural
                        challenges.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
