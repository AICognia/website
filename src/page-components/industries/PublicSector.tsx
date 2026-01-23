'use client'

import IndustryPageTemplate from '../../components/templates/IndustryPageTemplate'
import { publicSectorData } from '../../data/industryData'

const PublicSector: React.FC = () => {
  return <IndustryPageTemplate data={publicSectorData} />
}

export default PublicSector
