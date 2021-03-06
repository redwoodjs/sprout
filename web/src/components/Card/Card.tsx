import { OnTagClick } from 'src/pages/ExamplesPage/components/Filters/useFilters'
import External, { ExternalProps } from 'web/src/components/Card/External'
import Highlight from 'web/src/components/Card/Highlight'
import Standard, { StandardProps } from 'web/src/components/Card/Standard'
import { TagProps } from 'web/src/components/Tag/Display'

export enum CardVariant {
  highlight = 'highlight',
  standard = 'standard',
  external = 'external',
}

export interface CardProps {
  label: string
  link: string
  title: string
  tags: Array<string & TagProps>
  excludeTag?: string
  description?: string
  media?: Record<string, string>
  onTagClick?: OnTagClick
}

interface ProxyProps extends CardProps, StandardProps, ExternalProps {
  variant: CardVariant
}

const Card: React.FC<ProxyProps> = ({
  variant = CardVariant.external,
  ...props
}) => {
  switch (variant) {
    case CardVariant.highlight:
      return <Highlight {...props} />
    case CardVariant.standard:
      return <Standard {...props} />
    default:
      return <External {...props} />
  }
}

export default Card
