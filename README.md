### Job Insight Pro - Project developed for MindsDB Hackathon
---
It is an application designed to streamline the job search process. Job Insight Pro not only fetches relevant job listings but also provides valuable insights. These insights include a breakdown of missing and matching skills, as well as the percentage of alignment between the job profile and the user's resume.

### Demo - [Watch Now](https://youtu.be/pluDWdDFLr0?si=ynb7dS9yEl9m1RY_)

### How to set it up

- Clone the repository
- Go to repository project and run given command (If your device does not have nodejs then install it first)
    ```yarn```
- Create the `env.local` file and assign given environment variables
    ```
    NEXT_PUBLIC_SUPABASE_URL=<Supabase URL>
    NEXT_PUBLIC_SUPABASE_KEY=<Supabase Secret Key>
    NEXT_PUBLIC_MINDSDB_USER=<Mindsdb User Email>
    NEXT_PUBLIC_MINDSDB_PASSWORD=<MindsDB Password>
    ```
- Execute given SQL queries on MindsDB
    ```
    CREATE DATABASE my_web WITH ENGINE = 'web';
    
    CREATE DATABASE supabase_datasource WITH ENGINE = 'supabase',PARAMETERS = {
  "host": "<host URL>", "port":5432,                                     --- port used to make TCP/IP connection
  "database": "postgres",                              --- database name
  "user": "<User Name>",                                  --- database user
  "password": "<Password of Supabase>"                             --- database password
    };

    CREATE ML_ENGINE openai_engine
    FROM openai
    USING
        api_key = '<OpenAI API Key>';

    CREATE MODEL mindsdb.ResumeInsight
    PREDICT response
    USING
        engine = 'openai_engine',
        prompt_template = 'Give me the skills from given Resume which I could compare with Job Description
        Resume
        "{{resume_text}}"';

    CREATE MODEL mindsdb.cover_letter_model
    PREDICT response
    USING
        max_tokens = 1000,
        engine = 'openai_engine',
        prompt_template = 'I want you to work as a Cover Letter Guidance Expert. Based on provided Resume and job description generate me the cover letter within 500 words.
        
        Resume
        "{{resume_text}}"

        Job Description
        "{{job_description}}"
        
        ';

        CREATE MODEL JobModel
        PREDICT answer
        USING
            engine = 'openai_engine',
            prompt_template = 'Using the resume and job description below, give me the matched skills, missing skiils based on resume and job description and percentage that how much resume match with job description. 

        Take the output and put in below format

        Format:
        {
        "Matched_Skills":[],
        "Missing_Skills":[],
        "Percentage_Matched":
        }

            Resume:
            Mit Suthar
            Skills - Typescript, Javascript, mongodb
        
            Job Description:
            "{{job_description}}"';

    ```
- Now you can run the project
    `yarn run dev`

### Tech Stack
- NextJS
- Supabase
- MindsDB
- Shadcn UI

