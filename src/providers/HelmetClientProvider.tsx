'use client'

import React from 'react'
import { HelmetProvider } from 'react-helmet-async'

export const HelmetClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <HelmetProvider>{children}</HelmetProvider>
}
