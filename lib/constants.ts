import { ArrowRight, ArrowUpRight, BanknoteIcon, CogIcon, Home, HomeIcon, InfoIcon, LucideIcon, MenuIcon, NewspaperIcon, User } from 'lucide-react';

export const navItems = [
    {
        name: 'Home',
        url: '/',
        icon: HomeIcon  ,
        disabled: false
    },
    {
        name: 'Contact',
        url: '/contact',
        icon: User,
        disabled: false
    },
    {
        name: 'Services',
        url: '/services',
        icon: CogIcon,
        disabled: false
    },
    {
        name: 'Blog',
        url: '/blog',
        icon: NewspaperIcon,
        disabled: false
    },
    {
        name: 'Pricing',
        url: '/pricing',
        icon: BanknoteIcon,
        disabled: false
  
    },
  ];