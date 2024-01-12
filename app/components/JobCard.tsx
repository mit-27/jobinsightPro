"use client"

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {DownloadIcon,ExternalLinkIcon} from '@radix-ui/react-icons'


const JobCard = () => {
  return (
    <div className='w-full border-1 dark:border-white dark:border-2 border-slate-500 rounded-lg shadow-lg flex flex-col p-5 my-2'>

        <div className='flex relative items-center justify-between '>
            <div className='relative flex flex-col'>
            <h1 className='text-xl'>Job Title</h1>
            <h3 className='text-slate-500'>Company Name</h3>
            </div>
            <div className='mr-5'>
            <div className='w-10 h-10 flex flex-col items-center justify-center mx-auto'>
            <CircularProgressbar value={30} text={`30%`} strokeWidth={15} />
            </div>
            <h3>Job Matches</h3>
            </div>
        </div>

        <div className='relative flex gap-2 items-start justify-start my-2'>
            <h3 className='min-w-40'>Matched Skills : </h3>
            <div className='flex flex-wrap gap-2 justify-start'>
                <Badge variant='outline' className='text-blue-500'>MySQL</Badge>
                <Badge variant='outline' className='text-blue-500'>MySQL</Badge>
                <Badge variant='outline' className='text-blue-500'>MySQL</Badge>
                <Badge variant='outline' className='text-blue-500'>MySQL</Badge>
                <Badge variant='outline' className='text-blue-500'>MySQL</Badge>
                <Badge variant='outline' className='text-blue-500'>MySQL</Badge>
                <Badge variant='outline' className='text-blue-500'>MySQL</Badge>
                <Badge variant='outline' className='text-blue-500'>MySQL</Badge>
                <Badge variant='outline' className='text-blue-500'>MySQL</Badge>
                <Badge variant='outline' className='text-blue-500'>MySQL</Badge>
                <Badge variant='outline' className='text-blue-500'>MySQL</Badge>
                <Badge variant='outline' className='text-blue-500'>MySQL</Badge>
                <Badge variant='outline' className='text-blue-500'>MySQL</Badge>
                <Badge variant='outline' className='text-blue-500'>MySQL</Badge>
                <Badge variant='outline' className='text-blue-500'>MySQL</Badge>
                <Badge variant='outline' className='text-blue-500'>MySQL</Badge>
                <Badge variant='outline' className='text-blue-500'>MySQL</Badge>
                <Badge variant='outline' className='text-blue-500'>MySQL</Badge>
                <Badge variant='outline' className='text-blue-500'>MySQL</Badge>
                <Badge variant='outline' className='text-blue-500'>MySQL</Badge>
                <Badge variant='outline' className='text-blue-500'>MySQL</Badge>
                <Badge variant='outline' className='text-blue-500'>MySQL</Badge>
                <Badge variant='outline' className='text-blue-500'>MySQL</Badge>
                <Badge variant='outline' className='text-blue-500'>MySQL</Badge>
                <Badge variant='outline' className='text-blue-500'>MySQL</Badge>
                <Badge variant='outline' className='text-blue-500'>MySQL</Badge>
                <Badge variant='outline' className='text-blue-500'>MySQL</Badge>
                <Badge variant='outline' className='text-blue-500'>MySQL</Badge>

                
             


                
            </div>
        </div>

        <div className='relative flex gap-2 my-2 items-start justify-start'>
            <h3 className='min-w-40'>Missing Skills : </h3>
            <div className='flex flex-wrap gap-2'>
                <Badge variant='destructive' >MySQL</Badge>
                <Badge variant='destructive' >MySQL</Badge>
                <Badge variant='destructive' >MySQL</Badge>
                <Badge variant='destructive' >MySQL</Badge>
                <Badge variant='destructive' >MySQL</Badge>
                <Badge variant='destructive' >MySQL</Badge>
                <Badge variant='destructive' >MySQL</Badge>
                <Badge variant='destructive' >MySQL</Badge>
                <Badge variant='destructive' >MySQL</Badge>
                <Badge variant='destructive' >MySQL</Badge>
                <Badge variant='destructive' >MySQL</Badge>
                <Badge variant='destructive' >MySQL</Badge>
                <Badge variant='destructive' >MySQL</Badge>
                <Badge variant='destructive' >MySQL</Badge>
                <Badge variant='destructive' >MySQL</Badge>
                <Badge variant='destructive' >MySQL</Badge>
                <Badge variant='destructive' >MySQL</Badge>
                <Badge variant='destructive' >MySQL</Badge>
                <Badge variant='destructive' >MySQL</Badge>
                <Badge variant='destructive' >MySQL</Badge>
                <Badge variant='destructive' >MySQL</Badge>
                <Badge variant='destructive' >MySQL</Badge>

                
                
            </div>
        </div>

        <div className='flex relative gap-5 mt-5'>
            <Button variant='outline' className='text-primary'>Apply</Button>
            <Button variant='outline' className='text-primary'><DownloadIcon className='mr-1'/>Generate Cover Letter</Button>
            <Button variant='outline' className='text-primary'><ExternalLinkIcon className='mr-1'/> Details</Button>

           


        </div>

        

        

        


    </div>
  )
}

export default JobCard