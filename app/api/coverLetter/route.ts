import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import axios from 'axios'
import * as cheerio from 'cheerio';
import MindsDB from 'mindsdb-js-sdk';
import fs from 'fs'



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

    try {

        const { apply_link, resume_link } = await req.json();

        const jobDescription = await fetchJobDescription(apply_link); // Fetch job description

        console.log("Job Description : ", jobDescription)




        await MindsDB.connect({
            user: process.env.NEXT_PUBLIC_MINDSDB_USER!,
            password: process.env.NEXT_PUBLIC_MINDSDB_PASSWORD!
        });

        const web_crawl_query = `SELECT  * FROM my_web.crawler WHERE url = '${resume_link}' LIMIT 1;`;



        const webQueryResult = await MindsDB.SQL.runQuery(web_crawl_query);

        const resumeText = webQueryResult.rows[0].text_content

        const coverLetterQuery = `SELECT response from cover_letter_model where resume_text="${resumeText}" and job_description="${jobDescription}";`;

        const coverLetterResult = await MindsDB.SQL.runQuery(coverLetterQuery);

        console.log("cover letter result : ", coverLetterResult)

        const coverLetterText = coverLetterResult.rows[0].response;







        return NextResponse.json({ message: "Successfull", coverLetter: coverLetterText, status: 201 })



    }
    catch (error) {

        return NextResponse.json({ message: "error", error })


    }
}