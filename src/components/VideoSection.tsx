import React from 'react';

const VideoSection: React.FC = () => {
  return (
    <section className="relative bg-black text-white py-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Video container */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <video
              className="w-full h-auto"
              autoPlay
              loop
              muted
              playsInline
              controls
              controlsList="nodownload"
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect width='1920' height='1080' fill='%23000'/%3E%3C/svg%3E"
            >
              <source src="https://qnhjatjqyogmh5x3.public.blob.vercel-storage.com/MORGAN.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
