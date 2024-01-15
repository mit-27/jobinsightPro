import { NextResponse } from 'next/server'
import axios from 'axios'
import MindsDB from 'mindsdb-js-sdk';


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));



export const POST = async (req: Request, res: NextResponse) => {

    try {

        const { resumeLink, user_id } = await req.json();


        await MindsDB.connect({
            user: process.env.NEXT_PUBLIC_MINDSDB_USER!,
            password: process.env.NEXT_PUBLIC_MINDSDB_PASSWORD!
        });

        const allProjects = await MindsDB.Projects.getAllProjects();

        // console.log(allProjects)

        // console.log("resumeLink : ", resumeLink)





        const web_crawl_query = `SELECT  * FROM my_web.crawler WHERE url = '${resumeLink}' LIMIT 1;`;



        const webQueryResult = await MindsDB.SQL.runQuery(web_crawl_query);

        let resumeText = webQueryResult.rows[0].text_content

        // generating the resume insight from resumeText

        // const resumeInsightModelQuery = `SELECT response from resumeinsight WHERE resume_text ='${resumeText}';`;

        // const resumeInsightModelQueryResult = await MindsDB.SQL.runQuery(resumeInsightModelQuery);

        // resumeText = resumeInsightModelQueryResult.rows[0].response;

        // console.log(resumeInsightModelQueryResult)

        // return NextResponse.json({ data: "Done", status: 200 })




        // adjusting the model and modify the prompt template

        const JobModel = await MindsDB.Models.getModel('jobmodel', 'mysql_temp');

        // Before modification
        const beforemodel = await MindsDB.SQL.runQuery('show models');
        // console.log('Before model : ', beforemodel)
        await JobModel?.retrain({ using: { 'prompt_template': `Using the resume and job description below, give me the matched skills, missing skiils based on resume and job description and percentage that how much resume match with job description. Take the output and put in below format  Format:{"Matched_Skills":[],"Missing_Skills":[],"Percentage_Matched":}    Resume: ${resumeText}  |     Job Description:   "{{job_description}}"` } })
        // console.log("update Status : ", JobModel?.status)

        await delay(1000)

        const dropModelQuery = `show models`;
        const dropModelQueryResult = await MindsDB.SQL.runQuery(dropModelQuery);
        // console.log("after model : ", dropModelQueryResult);



        // Combining the model and table
        const combineQuery = `SELECT input.title,input.company,input.location,input.apply_link,input.job_description, output.answer
        FROM supabase_datasource.mainTB AS input
        JOIN mysql_temp.jobmodel AS output where input.resume_link="${user_id}"
        LIMIT 10`;

        const combineQueryResult = await MindsDB.SQL.runQuery(combineQuery);

        await delay(1000);

        console.log("After combining model with SQL table length : ", combineQueryResult.rows.length)

        let returnedData: any[] = []

        // for(var i=0;i<combineQueryResult.rows.le)

        combineQueryResult.rows.map((obj) => {

            try {
                let insightObj = JSON.parse(obj.answer)
                returnedData.push({
                    title: obj.title,
                    company: obj.company,
                    location: obj.location,
                    apply_link: obj.apply_link,
                    insight: insightObj
                })

            }
            catch (error) {



                console.log(error)



            }






        })



        console.log("User id : ", user_id);

        return NextResponse.json({ data: returnedData }, { status: 200 })
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ message: "error", error })

    }
}