'use client'

import { queryClient } from '@/lib/react-query-client'
import {HeroUIProvider} from '@heroui/react'
import { QueryClientProvider, HydrationBoundary } from '@tanstack/react-query';



export function Providers({children}) {
  return (

    <QueryClientProvider client={queryClient} >
    <HeroUIProvider>
      {children}
    </HeroUIProvider>
    </QueryClientProvider>
  )
}