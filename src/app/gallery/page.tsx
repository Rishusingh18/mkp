import React from 'react';

export const metadata = {
  title: 'Gallery - MKP Packers & Movers',
  description: 'View our recent moves and glimpses of our precision packing and secure transportation in action. Explore our high-quality moving services.',
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-background-light pt-12 lg:pt-16 pb-20 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 mb-12 lg:mb-20 text-center relative z-10">
        <div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-primary mb-6 tracking-tight">
            Our Gallery
          </h1>
          <p className="text-primary/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
            Glimpses of our precision packing and secure transportation in action. We treat your belongings as our own.
          </p>
        </div>
      </section>

      {/* 2. GALLERY GRID */}
      <section className="bg-white py-16 border-y border-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-primary/10 aspect-[4/3] group relative">
              <img 
                src="/gallery/mkp-packers-movers-recent-move-1.webp" 
                alt="MKP Packers and Movers safely loading items during a recent move" 
                width={800}
                height={600}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-primary/10 aspect-[4/3] group relative">
              <img 
                src="/gallery/mkp-packers-movers-recent-move-2.webp" 
                alt="MKP Packers and Movers secure packaging for delicate household goods" 
                width={800}
                height={600}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-primary/10 aspect-[4/3] group relative">
              <img 
                src="/gallery/mkp-packers-movers-recent-move-3.webp" 
                alt="MKP Movers efficiently unloading goods at the destination" 
                width={800}
                height={600}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            {/* Video Items */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-primary/10 aspect-[4/3] group relative bg-black">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                poster="/gallery/video-poster.webp" 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              >
                <source src="/gallery/videos/mkp-packers-movers-recent-move-video-1.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40">
                  <span className="material-icons text-white">play_arrow</span>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-primary/10 aspect-[4/3] group relative bg-black">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                poster="/gallery/video-poster.webp" 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              >
                <source src="/gallery/videos/mkp-packers-movers-recent-move-video-2.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40">
                  <span className="material-icons text-white">play_arrow</span>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-primary/10 aspect-[4/3] group relative bg-black">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                poster="/gallery/video-poster.webp" 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              >
                <source src="/gallery/videos/mkp-packers-movers-recent-move-video-3.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40">
                  <span className="material-icons text-white">play_arrow</span>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-primary/10 aspect-[4/3] group relative bg-black">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                poster="/gallery/video-poster.webp" 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              >
                <source src="/gallery/videos/mkp-packers-movers-recent-move-video-4.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40">
                  <span className="material-icons text-white">play_arrow</span>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-primary/10 aspect-[4/3] group relative bg-black">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                poster="/gallery/video-poster.webp" 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              >
                <source src="/gallery/videos/mkp-packers-movers-recent-move-video-5.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40">
                  <span className="material-icons text-white">play_arrow</span>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-primary/10 aspect-[4/3] group relative bg-black">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                poster="/gallery/video-poster.webp" 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              >
                <source src="/gallery/videos/mkp-packers-movers-recent-move-video-6.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40">
                  <span className="material-icons text-white">play_arrow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
