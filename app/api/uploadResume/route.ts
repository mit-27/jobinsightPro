import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!);


export const GET = async (req: Request, res: NextResponse) => {
    try {



        const { data, error } = await supabase.storage.listBuckets()

        console.log(data)

        const res = await supabase.storage.from('mindsdb').getPublicUrl('public/Mit Suthar - Resume.pdf')

        console.log(res)



        return NextResponse.json({ name: "Mit" })

    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "error", err })
    }
}

export const POST = async (req: Request, res: NextResponse) => {

    try {
        const { file, filePath } = await req.json();
        // const file = resumefile
        // console.log(URL.createObjectURL(file))
        // const fileExt = file.name.split('.').pop();
        // const fileName = `${Math.random()}.${fileExt}`;
        // const filePath = `${fileName}`;

        // console.log("File path : ", filePath)

        const { data, error } = await supabase.storage.from("mindsdb").upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
        });

        return NextResponse.json({ name: "" })

    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "error", err })
    }



}