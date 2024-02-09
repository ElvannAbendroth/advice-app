import Icon from '@/components/ui/Icon'

const navItems = [
  { label: 'home', href: '/' },
  { label: 'advice', href: '/advice' },
  { label: 'Tic Tac Toe', href: '/tictactoe' },
  { label: 'Wordle', href: '/wordle' },
]

export const Navbar: React.FC<{}> = () => {
  //TODO: change nav item styling based on path
  //TODO: animation with a little bar that moves from element to element
  return (
    <div className="fixed top-0 left-0 right-0">
      <div className="flex justify-between  py-6 px-6 max-w-7xl m-auto flex-wrap gap-6">
        <a href="/" className="flex gap-2 items-center text-gradient-to-r hover:text-primary cursor-pointer">
          <Icon className="h-7 w-7" name="Gamepad" size="48" />
          <p className="text-xl font-bold ">Playful</p>
        </a>
        <div className="flex items-center gap-6 flex-wrap">
          {navItems.map(item => (
            <a
              key={item.label}
              href={item.href}
              className="uppercase font-medium text-xs tracking-[0.2em] hover:text-primary transition-all hover:underline underline-offset-4 decoration-2"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Navbar
