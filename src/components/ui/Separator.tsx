import Icon from '@/components/ui/Icon'

const Separator = () => {
  return (
    <div className="flex items-center gap-4">
      <hr className="flex-grow border-foreground/15" />
      <Icon className="h-5 w-5 text-foreground/50" name="Ampersand" size="48" />
      <hr className="flex-grow border-foreground/15" />
    </div>
  )
}

export default Separator
