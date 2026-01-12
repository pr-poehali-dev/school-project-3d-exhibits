import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Gallery3D from '@/components/Gallery3D';
import Exhibition from '@/components/Exhibition';
import History from '@/components/History';
import About from '@/components/About';
import Contacts from '@/components/Contacts';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main id="home">
        <Hero />
        <Gallery3D />
        <Exhibition />
        <History />
        <About />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
