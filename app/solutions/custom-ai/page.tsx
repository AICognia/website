import { Metadata } from 'next'
import CustomAIClient from './CustomAIClient'

export const metadata: Metadata = {
  title: 'Custom AI Solutions - AI Built Just for You',
  description: 'Your business is unique. Your AI should be too. We build custom AI solutions including document processing, NLP models, process automation, predictive analytics, computer vision, and LLM fine-tuning.',
  keywords: [
    'custom AI solutions', 'enterprise AI', 'AI development', 'custom machine learning',
    'document processing AI', 'NLP models', 'process automation', 'predictive analytics',
    'computer vision', 'LLM fine-tuning', 'AI consulting', 'bespoke AI'
  ],
  openGraph: {
    title: 'Custom AI Solutions | AI Built Just for You',
    description: 'Custom AI for your unique challenges. Document processing, NLP, automation, analytics, and more.',
    url: 'https://cogniaai.com/solutions/custom-ai',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom AI Solutions | Cognia AI',
    description: 'AI built specifically for your business. From discovery to deployment.',
  },
  alternates: {
    canonical: 'https://cogniaai.com/solutions/custom-ai',
  },
}

export default function CustomAIPage() {
  return <CustomAIClient />
}
