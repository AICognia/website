import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { useVideo } from '../contexts/VideoContext';

const FeaturesSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const { setVideoRef, setAudioAnalyser } = useVideo();

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Set video ref in context
    setVideoRef(videoRef);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement.play().catch(() => {
              // Autoplay might be blocked, user needs to interact
            });
          } else {
            videoElement.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, [setVideoRef, setAudioAnalyser]);

  // Mobile video observer
  useEffect(() => {
    const mobileVideo = mobileVideoRef.current;
    if (!mobileVideo) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            mobileVideo.play().catch(() => {
              // Autoplay might be blocked
            });
          } else {
            mobileVideo.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(mobileVideo);

    return () => {
      observer.disconnect();
    };
  }, []);

  const features = [
    {
      title: 'AI Call Handling',
      description: 'Advanced AI receptionists handle every call with natural conversation, booking appointments and answering questions like a human would.'
    },
    {
      title: 'Multi-Language Support',
      description: 'Communicate with customers in over 20 languages. Our AI adapts to your customers\' preferred language automatically.'
    },
    {
      title: 'CRM Integration',
      description: 'Seamlessly integrate with your existing CRM, ERP, and booking systems. Our API provides full connectivity with your enterprise data.'
    }
  ];

  return (
    <section className="relative bg-black text-white py-16 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Mobile: Video first, then features */}
        <div className="lg:hidden">
          {/* Mobile Video */}
          <div className="relative mb-10">
            <div className="relative w-full flex items-center justify-center">
              <video
                ref={mobileVideoRef}
                loop
                muted
                playsInline
                controls
                className="w-full max-w-[320px] h-auto rounded-2xl shadow-2xl"
                style={{
                  objectFit: 'contain'
                }}
              >
                <source src="https://qnhjatjqyogmh5x3.public.blob.vercel-storage.com/MORGAN.mp4" type="video/mp4" />
              </video>
            </div>
            {/* Caption */}
            <p className="text-center text-xs text-gray-500 mt-3">
              Watch our AI receptionist in action
            </p>
          </div>

          {/* Mobile Features */}
          <div className="space-y-8">
            {features.map((feature, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-xl font-light text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="mt-10 text-center">
            <Link
              to="/demo"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
            >
              Get Your AI Receptionist
              <FaArrowRight className="text-sm" />
            </Link>
          </div>
        </div>

        {/* Desktop: Side by side */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Features */}
          <div className="space-y-16">
            {features.map((feature, index) => (
              <div key={index} className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-light text-white">
                  {feature.title}
                </h3>
                <p className="text-base text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right Side - Video */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full h-[600px] flex items-center justify-center">
              <video
                ref={videoRef}
                loop
                muted
                playsInline
                controls
                className="h-[600px] w-auto rounded-2xl shadow-2xl"
                style={{
                  objectFit: 'contain'
                }}
              >
                <source src="https://qnhjatjqyogmh5x3.public.blob.vercel-storage.com/MORGAN.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block text-center mt-16">
          <Link
            to="/demo"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
          >
            Get Your AI Receptionist
            <FaArrowRight className="text-sm" />
          </Link>
          <p className="text-xs text-gray-500 mt-3">1 week free trial. No credit card required.</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
