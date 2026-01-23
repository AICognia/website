'use client'

import IndustryPageTemplate from '../../components/templates/IndustryPageTemplate'
import { automotiveData } from '../../data/industryData'

const Automotive: React.FC = () => {
  return <IndustryPageTemplate data={automotiveData} />
}

export default Automotive
