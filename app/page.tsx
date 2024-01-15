import { Button } from '@/components/ui/button'
import Image from 'next/image'
import {ChevronRightIcon} from '@radix-ui/react-icons'
import Link from 'next/link'
export default function Home() {
  return (
    <main className='flex flex-col items-center w-full max-w-2xl mx-auto gap-4'>

        <Image
        src="/dashboard-img.png"
        width={500}
        height={500}
        alt="Picture of the author"
        />

        <h2 className='text-2xl font-semibold text-slate-600'><span className='text-3xl text-primary font-bold'>Job Insight Pro</span>- Your AI Job portal which provide jobs with insight and generate CV for each job description</h2>

        <Button variant='outline' className='border-primary text-primary' asChild>
          <Link href="/Dashboard">Explore <ChevronRightIcon className='ml-1'/></Link>
        </Button>



      


    </main>
      
    
  )
}
