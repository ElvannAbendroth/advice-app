import { icons, type LucideProps } from 'lucide-react'

interface IconProps extends LucideProps {
  name: keyof typeof icons
}

const Icon: React.FC<IconProps> = ({ name, color, size, ...props }) => {
  const LucideIcon = icons[name]

  if (!LucideIcon) {
    // Handle the case when the provided icon name is not valid
    throw new Error('Wrong Icon')
    return null
  }

  return <LucideIcon color={color} size={size} {...props} />
}

export default Icon
