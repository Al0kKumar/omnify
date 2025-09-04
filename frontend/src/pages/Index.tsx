import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import { PenTool, Users, Zap, Shield } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
            Your Stories, 
            <br />
            Amplified
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of writers sharing their thoughts, insights, and stories on Omnify. 
            The modern platform for content creators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-primary text-lg px-8 py-4" asChild>
              <Link to="/signup">Start Writing</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4" asChild>
              <Link to="/login">Explore Stories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to create
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful tools and a beautiful interface to help you craft and share your stories
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: PenTool,
              title: "Rich Editor",
              description: "Beautiful, distraction-free writing experience with powerful formatting tools"
            },
            {
              icon: Users,
              title: "Community",
              description: "Connect with fellow writers and build your audience organically"
            },
            {
              icon: Zap,
              title: "Fast & Responsive",
              description: "Lightning-fast performance on all devices, from mobile to desktop"
            },
            {
              icon: Shield,
              title: "Secure & Private",
              description: "Your content is protected with enterprise-grade security"
            }
          ].map((feature, index) => (
            <Card key={index} className="card-hover border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to share your story?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join our community of passionate writers and start creating today
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4" asChild>
              <Link to="/signup">Get Started for Free</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <PenTool className="h-6 w-6" />
            <span className="text-2xl font-bold">Omnify</span>
          </div>
          <p className="text-background/70">
            © 2025 Omnify. Empowering writers everywhere.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;