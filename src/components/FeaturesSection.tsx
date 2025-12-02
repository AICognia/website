import React, { useRef, useEffect } from 'react';
import { useVideo } from '../contexts/VideoContext';

const FeaturesSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { setVideoRef, setAudioAnalyser } = useVideo();

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Set video ref in context
    setVideoRef(videoRef);

    let audioContext: AudioContext | null = null;
    let hasSetupAudio = false;

    const setupAudio = () => {
      if (hasSetupAudio || !videoElement) return;

      try {
        // Setup audio context for visualization
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;

        const source = audioContext.createMediaElementSource(videoElement);
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        setAudioAnalyser(audioContext, analyser);
        hasSetupAudio = true;
      } catch (error) {
        console.error('Error setting up audio:', error);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Setup audio on first play
            if (!hasSetupAudio) {
              setupAudio();
            }

            // Resume audio context if suspended
            if (audioContext && audioContext.state === 'suspended') {
              audioContext.resume();
            }

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
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [setVideoRef, setAudioAnalyser]);

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
    <section className="relative bg-black text-white py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
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
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-full h-[700px] flex items-center justify-center">
              <video
                ref={videoRef}
                loop
                muted
                playsInline
                controls
                className="h-[700px] w-auto rounded-2xl shadow-2xl"
                style={{
                  objectFit: 'cover'
                }}
              >
                <source src="https://qnhjatjqyogmh5x3.public.blob.vercel-storage.com/MORGAN.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
