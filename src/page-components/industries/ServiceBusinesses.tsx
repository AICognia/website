'use client'

import IndustryPageTemplate from '../../components/templates/IndustryPageTemplate'
import { professionalServicesData } from '../../data/industryData'

// Use professional services data but customize for service businesses branding
const serviceBusinessesData = {
  ...professionalServicesData,
  slug: 'service-businesses',
  badge: 'Service Businesses',
  title: 'AI Transformation for',
  titleHighlight: 'Service Businesses',
}

const ServiceBusinesses: React.FC = () => {
  return <IndustryPageTemplate data={serviceBusinessesData} />
}

export default ServiceBusinesses
