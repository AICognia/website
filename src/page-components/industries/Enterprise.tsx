'use client'

import IndustryPageTemplate from '../../components/templates/IndustryPageTemplate'
import { professionalServicesData } from '../../data/industryData'

const Enterprise: React.FC = () => {
  return <IndustryPageTemplate data={professionalServicesData} />
}

export default Enterprise
