import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { Separator } from "@/components/ui/separator"
import JobCard from '../components/JobCard'



const dashboard = () => {
  return (
    <div className='w-full'>
        <div className='w-2xl flex relative items-center flex-col p-10'>
            <h2 className='text-2xl text-blue-500 font-bold'>Upload Your Resume</h2>
            <div className='mt-5 flex flex-col'>
                <Label htmlFor="resume" className='mb-1'>Resume</Label>
                <Input id="resume" type="file" />
                <Button className='mt-2'>Upload</Button>
            </div>
        </div>

        <div className='pl-5 relative max-w-5xl mx-auto'>
            <h2 className='text-2xl font-bold text-blue-400'>Job Section</h2>
            <Separator/>

            <div className='flex relative items-center justify-around gap-5  max-w-5xl mx-auto px-4 py-5'>
                <Input type="Job" placeholder="Enter Job Title" />
                <Input type="location" placeholder="Enter Location Title" />
                <Button>Search</Button>

            </div>

            <div className='flex relative flex-col items-center justify-evenly gap-4 max-w-5xl mx-auto'>

                <JobCard/>
                <JobCard/>
                <JobCard/>
                <JobCard/>

                
            </div>
        </div>
        
    </div>
  )
}

export default dashboard