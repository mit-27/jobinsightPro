"use client"
import { ReloadIcon } from "@radix-ui/react-icons"

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { Separator } from "@/components/ui/separator"
import JobCard from '../components/JobCard'
import axios from 'axios'
import {createClient} from '@supabase/supabase-js'
import { v4 as uuidv4 } from "uuid";


const dashboard = () => {

    const [file,setfile] = useState(null);
    const [uploading,setuploading] = useState(false)

    const handlefileChange = (event : any) => {

        if (event.target.files && event.target.files[0]) {
            setfile(event.target.files[0]);
          }


    }

    const onUpload =  async () => {

        // const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_KEY);

        
        // const { data, error } = await supabase.storage.listBuckets()


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

        console.log(filepath)

        setuploading(false)


        

        // const {data} = await axios.post('/api/uploadResume',{file:file,filePath:file.name})

        // console.log(data)
    }


  return (
    <div className='w-full'>
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