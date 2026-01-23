'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaChevronRight, FaHome } from 'react-icons/fa';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const Breadcrumb: React.FC = () => {
  // Breadcrumbs disabled - return null for all pages
  return null;

  const pathname = usePathname();

  // Don't show breadcrumb on home page
  if (pathname === '/') return null;

  // Generate breadcrumb items based on current path
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = pathname.split('/').filter(p => p);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', path: '/' }
    ];

    let currentPath = '';
    paths.forEach(path => {
      currentPath += `/${path}`;
      const label = path
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      breadcrumbs.push({ label, path: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="hidden lg:block bg-slate-900/50 backdrop-blur-sm border-b border-slate-800/50"
      aria-label="Breadcrumb"
    >
      <div className="container mx-auto px-6 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((item, index) => (
            <li key={item.path} className="flex items-center">
              {index > 0 && (
                <FaChevronRight className="mx-2 text-slate-600 text-xs" />
              )}

              {index === breadcrumbs.length - 1 ? (
                // Current page (last item)
                <span className="text-blue-400 font-medium flex items-center gap-2">
                  {index === 0 && <FaHome className="text-xs" />}
                  {item.label}
                </span>
              ) : (
                // Clickable breadcrumb
                <Link
                  href={item.path}
                  className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                >
                  {index === 0 && <FaHome className="text-xs group-hover:scale-110 transition-transform" />}
                  <span className="hover:underline underline-offset-2">
                    {item.label}
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </motion.nav>
  );
};

// Structured data for breadcrumbs (SEO)
export const BreadcrumbSchema: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": typeof window !== 'undefined' ? `${window.location.origin}${item.path}` : `https://cogniaai.com${item.path}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default Breadcrumb;