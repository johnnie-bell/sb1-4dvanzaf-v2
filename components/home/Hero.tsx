import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export function Hero() {
  const { t } = useLanguage();

  const scrollToBrowse = () => {
    const browseSection = document.getElementById('browse');
    if (browseSection) {
      browseSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="Holiday background"
          fill
          className="object-cover"
          priority
          unoptimized
          onError={(e) => {
            // Fallback to Unsplash image
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&h=900&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-white/70" />
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 md:px-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          <span className="block">Can’t pack it?</span>
  <span className="block">Rent it.</span>
        </h1>
<p className="mt-2 text-xs md:text-sm text-gray-700/90 uppercase tracking-wide text-center">
  (Delivery &amp; Collection Service)
</p>

<div className="mt-5 space-y-3 md:space-y-4 text-center">
  <p className="text-sm md:text-base text-gray-600 leading-relaxed mx-auto max-w-[58ch]">
    Paddle Boards, Bikes, Beach Chairs &amp; Parasols, Fishing Rods, E-Scooters, Beach Tents for the Kids,
    Baby Baths, Baby Chairs and lots more.
  </p>
  <p className="text-sm md:text-base text-gray-700 leading-relaxed mx-auto max-w-[58ch]">
    Rent everything you need for the perfect holiday experience.
  </p>
</div>
        <Button
  size="lg"
  className="mt-6 md:mt-8 text-lg px-8 py-6 h-auto bg-primary hover:bg-primary/90"
  onClick={scrollToBrowse}
>
  {t('browseItems')}
</Button>

      </div>
    </section>
  );
}
