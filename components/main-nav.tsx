"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Pharmacology",
    href: "/services?tab=pharmacology&category=pharmacology",
    description: "Central nervous system studies and related pharmacological research.",
  },
  {
    title: "Pharmacokinetics",
    href: "/services?tab=pharmacokinetics&category=pharmacokinetics",
    description: "Studies on drug absorption, distribution, metabolism, and excretion.",
  },
  {
    title: "Toxicology",
    href: "/services?tab=toxicology&category=toxicology",
    description: "Comprehensive toxicity studies for drug development.",
  },
  {
    title: "Critical Surgeries",
    href: "/specialties#critical-surgeries",
    description: "Specialized surgical procedures for research applications.",
  },
  {
    title: "Complex Matrix Collections",
    href: "/specialties#complex-matrix",
    description: "Collection and analysis of complex biological matrices.",
  },
  {
    title: "Customized Animal Models",
    href: "/specialties#animal-models",
    description: "Development of tailored animal models for specific research needs.",
  },
  {
    title: "Product Launch Studies",
    href: "/specialties#product-launch",
    description: "Pilot studies oriented towards product launch and validation.",
  },
  {
    title: "Precision Techniques",
    href: "/specialties#precision-techniques",
    description: "Unique techniques with high precision and accuracy for specialized research.",
  },
]

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="flex justify-between w-full items-center">
      <Link href="/" className="flex items-center space-x-2">
        <span className="font-bold text-xl">Cology Biosciences</span>
      </Link>
      <NavigationMenu className={cn("hidden md:flex", className)} {...props}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Services</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {components.slice(0, 3).map((component) => (
                  <ListItem key={component.title} title={component.title} href={component.href}>
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Specialties</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {components.slice(3).map((component) => (
                  <ListItem key={component.title} title={component.title} href={component.href}>
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>About</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/contact" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Contact</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="hidden md:block">
        <Button asChild>
          <Link href="/client-portal">Client Portal</Link>
        </Button>
      </div>
      <div className="md:hidden">{/* Mobile menu button would go here */}</div>
    </div>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"

