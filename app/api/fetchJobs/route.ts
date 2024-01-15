import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import axios from 'axios'
import * as cheerio from 'cheerio';


const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchJobDescription = async (url) => {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        // Extract job description here based on the HTML structure of the LinkedIn job posting page
        const jobDescription = $('div.description__text').text().trim(); // Update the selector based on the actual HTML structure

        return jobDescription;
    } catch (error) {
        // console.error('Error fetching job description:', error);
        console.log(error)
        return null;
    }
};


export const POST = async (req: Request, res: NextResponse) => {

    const dd = []

    try {
        const { jobTitle, jobLocation, user_id } = await req.json();

        const url = `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=${jobTitle}&location=${jobLocation}&trk=public_jobs_jobs-search-bar_search-submit&currentJobId=2931031787&position=1&pageNum=0&start=0`;

        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const jobs = $('li');

        for (let i = 0; i < jobs.length; i++) {
            const jobTitle = $(jobs[i]).find('h3.base-search-card__title').text().trim();
            const company = $(jobs[i]).find('h4.base-search-card__subtitle').text().trim();
            const location = $(jobs[i]).find('span.job-search-card__location').text().trim();
            const link = $(jobs[i]).find('a.base-card__full-link').attr('href');

            const jobDescription = await fetchJobDescription(link); // Fetch job description


            await delay(1000);

            if (jobDescription == null) {
                console.log("Empty")
            }
            else {
                dd.push(
                    {
                        resume_link: user_id,
                        title: jobTitle,
                        company: company,
                        location: location,
                        apply_link: link,
                        job_description: jobDescription
                    }
                );

            }
            // const { data } = await supabase.from('mainTB')
            //     .insert({
            //         resume_link: "Msd",
            //         title: jobTitle,
            //         company: company,
            //         location: location,
            //         apply_link: link,
            //         job_description: jobDescription
            //     });

        }

        const { data } = await supabase.from('mainTB')
            .insert(dd);

        console.log("Total rows : ", dd.length)

        return NextResponse.json({ name: "Success" }, { status: 200 })

    }
    catch (err) {
        // console.log(err)
        return NextResponse.json({ message: "error", err })
    }


}