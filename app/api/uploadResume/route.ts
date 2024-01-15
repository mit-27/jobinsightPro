import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!);


export const GET = async (req: Request, res: NextResponse) => {
    try {

        console.log("Hello")



        return NextResponse.json({ name: "Mit" })

    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "error", err })
    }
}

export const POST = async (req: Request, res: NextResponse) => {

    try {
        const { file, filePath } = await req.json();
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