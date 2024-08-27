import Icon from '@/components/ui/Icon'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover'
import { navItems } from '@/lib/config'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { AnimatePresence, motion } from 'framer-motion'
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/astro/react'
import { useEffect, useState } from 'react'
import { Skeleton } from './ui/Skeleton'

export const Navbar: React.FC<{}> = () => {
  //TODO: change nav item styling based on path
  //TODO: animation with a little bar that moves from element to element

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <AnimatePresence>
      <div id="nav-wrapper" className="p-4">
        <div
          id="navbar"
          className="flex justify-between  py-4 px-6 max-w-7xl m-auto flex-wrap gap-6 shadow-lg bg-card/50 rounded-full"
        >
          <a
            id="logo"
            data-astro-reload
            href="/"
            className="flex gap-2 items-center text-gradient-to-r hover:text-primary cursor-pointer transition-all duration-500"
          >
            <Icon className="h-7 w-7" name="Gamepad" size="48" />
            <p className="text-xl font-bold ">Playful</p>
          </a>
          <motion.div id="mobile-nav" className="visible md:hidden flex gap">
            <SignedOut>
              <SignInButton mode="modal" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>

            <Popover>
              <PopoverTrigger>
                <Icon className="h-7 w-7 cursor-pointer" name="Menu" size="48" />
              </PopoverTrigger>
              <PopoverContent
                sideOffset={-61}
                className="flex flex-col w-[100vw] h-[100vh] justify-center items-center gap-3 py-4 shadow-lg rounded-none bg-card/30 backdrop-blur-2xl relative"
              >
                <PopoverPrimitive.Close className="uppercase font-medium text-lg tracking-[0.2em] text-center transition-all py-4 px-6 absolute top-4 right-4 ">
                  <Icon className="h-7 w-7 cursor-pointer" name="X" size="48" />
                </PopoverPrimitive.Close>
                {navItems.map(item => (
                  <a
                    data-astro-reload
                    key={item.label}
                    href={item.href}
                    className="uppercase font-medium text-lg tracking-[0.2em] hover:text-background hover:bg-gradient-to-r hover:from-primary hover:to-secondary rounded-full w-full text-center transition-all duration-500 p-2 "
                  >
                    {item.label}
                  </a>
                ))}
                <SignedIn>
                  <a
                    href={'/dashboard'}
                    data-astro-reload
                    className="uppercase font-medium text-lg tracking-[0.2em] hover:text-background hover:bg-gradient-to-r hover:from-primary hover:to-secondary rounded-full w-full text-center transition-all duration-500 p-2 "
                  >
                    Dashboard
                  </a>
                </SignedIn>
              </PopoverContent>
            </Popover>
          </motion.div>
          <div id="desktop-nav" className=" hidden md:flex flex-row gap-4 justify-center items-center">
            {navItems.map(item => (
              <a
                key={item.label}
                data-astro-reload
                href={item.href}
                className="uppercase font-medium text-xs tracking-[0.2em] hover:text-primary transition-all hover:underline underline-offset-4 decoration-2"
              >
                {item.label}
              </a>
            ))}
            <SignedIn>
              <a
                href={'/dashboard'}
                data-astro-reload
                className="uppercase font-medium text-xs tracking-[0.2em] hover:text-primary transition-all hover:underline underline-offset-4 decoration-2"
              >
                Dashboard
              </a>
            </SignedIn>
            {isLoading ? (
              <Skeleton className="size-8 rounded-full" />
            ) : (
              <>
                <SignedOut>
                  <SignInButton mode="modal" />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </>
            )}
          </div>
        </div>
      </div>
    </AnimatePresence>
  )
}

export default Navbar
