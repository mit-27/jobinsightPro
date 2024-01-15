"use client"
import { Half2Icon, ReloadIcon } from "@radix-ui/react-icons"
import Head from 'next/head'
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { Separator } from "@/components/ui/separator"
import JobCard from '../components/JobCard'
import axios from 'axios'
import {createClient} from '@supabase/supabase-js'
import { v4 as uuidv4 } from "uuid";
import type { Metadata } from 'next'



const dashboard = () => {

    const [file,setfile] = useState(null);
    const [jobTitle,setJobTitle] = useState('')
    const [jobLocation,setJobLocation] = useState('')
    const [uploading,setuploading] = useState(false)
    const [fetchingJobs,setFetchingJobs] = useState(false)

    const [jobs,setJobs] = useState([
        // {
        //     title:'Software Developer',
        //     company:'Firefox',
        //     location:'Mumbai',
        //     apply_link:'https://in.linkedin.com/jobs/view/sde-2-backend-at-jar-3775457542?refId=T7FW6F6I9ghjlP5EbPuHCQ%3D%3D&trackingId=IOf6gBljEIGop9oxYliLLQ%3D%3D&position=8&pageNum=0&trk=public_jobs_jserp-result_search-card',
        //     insight:{"Matched_Skills": ["Python", "Java", "Go"], "Missing_Skills": ["SprintBoot"], "Percentage_Matched": 70}
        // },
        // {
        //     title:'Junior Software Engineer',
        //     company:'Candy',
        //     location:'New Delhi',
        //     apply_link:'https://in.linkedin.com/jobs/view/sde-2-backend-at-jar-3775457542?refId=T7FW6F6I9ghjlP5EbPuHCQ%3D%3D&trackingId=IOf6gBljEIGop9oxYliLLQ%3D%3D&position=8&pageNum=0&trk=public_jobs_jserp-result_search-card',
        //     insight:{"Matched_Skills": ["JavaScript", "C#", "HTML", "SharePoint Development", "OOPS"], "Missing_Skills": ["C", "Triggers", "AJAX", "Database", "SharePoint Server"], "Percentage_Matched": 50}
        // }
    ])

    const handlefileChange = (event : any) => {

        if (event.target.files && event.target.files[0]) {
            setfile(event.target.files[0]);
          }


    }

    const onUpload =  async () => {

        if(!file)
        {
            return;
        }
        setuploading(true);
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!);
        const filename = `${uuidv4()}-${file.name}`;
        const { data, error } = await supabase.storage
        .from("mindsdb")
        .upload(filename, file, {
            cacheControl: "3600",
            upsert: false,
        });

        const docData = await supabase
        .storage
        .from('mindsdb')
        .getPublicUrl(filename)

        const filepath = docData.data.publicUrl;

        localStorage.setItem('resumeURL',filepath)
        localStorage.setItem('resumeName',filename)
        localStorage.setItem('temp_userID',uuidv4())
        console.log(filepath)
        setuploading(false)

    }

    const handleJobTitle = (event) => {
        setJobTitle(event.target.value);
    }

    const handleJobLocation = (event) => {
        setJobLocation(event.target.value);
    }

    const searchJob = async () => {

        setFetchingJobs(true);

        // console.log(localStorage.getItem('temp_userID'))

        try
        {
        // const jobsList = await axios.post('api/fetchJobs',{jobTitle:jobTitle,jobLocation:jobLocation,user_id : localStorage.getItem('temp_userID')});

        // console.log(data);

        const {data } = await axios.post('api/jobInsights',{resumeLink:localStorage.getItem('resumeURL'),user_id:localStorage.getItem('temp_userID')})

        console.log(data.data.length)

        setJobs(data.data)

        console.log("type of jobs object : ",typeof data.data)

        setFetchingJobs(false)

        }
        catch(error)
        {
        setFetchingJobs(false)

        }


    }


  return (
    <div className='w-full'>
        <Head><title>Job Insight Pro</title></Head>
        <div className='w-2xl flex relative items-center flex-col p-10'>
            <h2 className='text-2xl text-blue-500 font-bold'>Upload Your Resume</h2>
            <div className='mt-5 flex flex-col'>
                <Label htmlFor="resume" className='mb-1'>Resume</Label>
                <Input id="resume" type="file" onChange={handlefileChange} />
                <Button className='mt-2' disabled={uploading? true : false} onClick={() => onUpload()}>
                    {uploading? <ReloadIcon className="animate-spin mr-2"></ReloadIcon> : <></>}
                    Upload</Button>
            </div>
        </div>

        <div className='pl-5 relative max-w-5xl mx-auto'>
            <h2 className='text-2xl font-bold text-blue-400'>Job Section</h2>
            <Separator/>

            <div className='flex relative items-center justify-around gap-5  max-w-5xl mx-auto px-4 py-5'>
                <Input type="Job" placeholder="Enter Job Title" onChange={handleJobTitle} />
                <Input type="location" placeholder="Enter Location Title" onChange={handleJobLocation} />
                <Button disabled={fetchingJobs? true : false} onClick={() => searchJob()}>{fetchingJobs? <ReloadIcon className="animate-spin mr-2"></ReloadIcon> : <></>}Search</Button>

            </div>

            <div className='flex relative flex-col items-center justify-evenly gap-4 max-w-5xl mx-auto'>

            {jobs.length !== 0 ?  
        jobs.map((jobObj) => <JobCard data={jobObj} />)
        :
        <h2>Search it first</h2>
    }

                {/* <JobCard/>
                <JobCard/>
                <JobCard/>
                <JobCard/> */}

                
            </div>
        </div>
        
    </div>
  )
}

export default dashboard