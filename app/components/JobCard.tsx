"use client"

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {DownloadIcon,ExternalLinkIcon} from '@radix-ui/react-icons'
import axios from 'axios'
import copy from 'clipboard-copy';
import { Half2Icon, ReloadIcon } from "@radix-ui/react-icons"


const JobCard = ({data}) => {

    const [loadingCoverLetter,setLoadingCoverLetter] = useState(false);

    const generateCoverLetter = async () => {

        setLoadingCoverLetter(true);

        try
        {
            const result = await axios.post('api/coverLetter',{
                apply_link:data.apply_link,
                resume_link : localStorage.getItem('resumeURL')
            });
    
            console.log(result.data.message);
    
            await copy(result.data.coverLetter);

            setLoadingCoverLetter(false)
        }

        catch(error)
        {
            setLoadingCoverLetter(false)

        }





    }


  return (
    <div className='w-full border-1 dark:border-white dark:border-2 border-slate-500 rounded-lg shadow-lg flex flex-col p-5 my-2'>

        <div className='flex relative items-center justify-between '>
            <div className='relative flex flex-col'>
            <h1 className='text-xl'>{data.title}</h1>
            <h3 className='text-slate-500'>{data.company}</h3>
            <h3 className='text-md'>Location : {data.location}</h3>
            </div>
            <div className='mr-5'>
            <div className='w-10 h-10 flex flex-col items-center justify-center mx-auto'>
            <CircularProgressbar value={data.insight.Percentage_Matched} text={data.insight.Percentage_Matched+`%`} strokeWidth={15} />
            </div>
            <h3>Job Matches</h3>
            </div>
        </div>

        <div className='relative flex gap-2 items-start justify-start my-2'>
            <h3 className='min-w-40'>Matched Skills : </h3>
            <div className='flex flex-wrap gap-2 justify-start'>
                {data.insight.Matched_Skills.map((e) => <Badge variant='outline' className='text-blue-500'>{e}</Badge>)}
                
            </div>
        </div>

        <div className='relative flex gap-2 my-2 items-start justify-start'>
            <h3 className='min-w-40'>Missing Skills : </h3>
            <div className='flex flex-wrap gap-2'>
                {data.insight.Missing_Skills.map((e) => <Badge variant='destructive' >{e}</Badge>)}
            </div>
        </div>

        <div className='flex relative gap-5 mt-5'>
            <Button variant='outline' className='text-primary' onClick={() => {window.open(data.apply_link,'_blank', 'noreferrer')}}>Apply</Button>
            <Button variant='outline' className='text-primary' onClick={() => generateCoverLetter()} disabled={loadingCoverLetter? true : false}>{loadingCoverLetter? <ReloadIcon className="animate-spin mr-2"></ReloadIcon> : <></>} Copy Cover Letter</Button>
            <Button variant='outline' className='text-primary' onClick={() => {window.open(data.apply_link,'_blank', 'noreferrer')}}><ExternalLinkIcon className='mr-1'/> Details</Button>

           


        </div>

        

        

        


    </div>
  )
}

export default JobCard