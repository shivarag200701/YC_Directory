"use client"
import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import MDEditor from '@uiw/react-md-editor'
import { Button } from './ui/button'
import { Send } from 'lucide-react'
import { formSchema } from '@/lib/validation'
import { ZodError } from "zod";
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { createStartup } from '@/lib/action'

const StartupForm = () => {
    const [error, setError] = useState({
        title:null,
        description:null,
        category:null,
        link:null,
        pitch:null,
    })
    const [pitch, setPitch] = useState('')  
    const router = useRouter()

    const handleFormSubmit = async (prevState:any,formData:FormData) =>{
        try{
            const formValues = {
                title:formData.get("title") as string,
                description:formData.get("description") as string,
                category:formData.get("category") as string,
                link:formData.get("link") as string,
                pitch,
            }
            await formSchema.parseAsync(formValues)

            const result = await createStartup(formValues,formData,pitch)
            if(result.status === "SUCCESS"){
                toast.success("Pitch submitted successfully")
                router.push(`/startup/${result._id}`)
            }
            return result
        }
        catch(error){
            if(error instanceof ZodError){
                const fieldErrors = error.flatten().fieldErrors;
                setError(fieldErrors as unknown as Record<string,string>)
                toast.error("Please check your inputs and try again")

                return { ...prevState,error: "Validation failed", status: "ERROR" }
            }
            toast.error("An unexpected error occurred")
            return { ...prevState,error: "Unexpected error", status: "ERROR" }

        }
        



    }
    
    const [state,formAction,isPending] = useActionState(handleFormSubmit,{
        error:"",
        status:"INITIAL",
    });


  return (
    <form action={formAction} className='startup-form'>
        <div>
            <label htmlFor="title" className='startup-form_label'>Title</label>
            <Input id='title' name='title' placeholder='Startup Title' className='startup-form_input' required />
            {error.title && <p className='startup-form_error'>{error.title}</p>}
        </div>
        <div>
            <label htmlFor="description" className='startup-form_label'>Description</label>
            <Textarea id='description' name='description' placeholder='Startup Description' className='startup-form_textarea' required />
            {error.description && <p className='startup-form_error'>{error.description}</p>}
        </div>
        <div>
            <label htmlFor="category" className='startup-form_label'>Category</label>
            <Input id='category' name='category' placeholder='Choose a category (eg. Tech, Health, Education, etc.)' className='startup-form_input' required />
            {error.category && <p className='startup-form_error'>{error.category}</p>}
        </div>
        <div>
            <label htmlFor="link" className='startup-form_label'>Image/Video Link</label>
            <Input id='link' name='link' placeholder='Paste a link to your demo or promotional media' className='startup-form_input' required />
            {error.link && <p className='startup-form_error'>{error.link}</p>}
        </div>
        <div data-color-mode="light">
            <label htmlFor="pitch" className='startup-form_label'>Pitch</label>
            <MDEditor value={pitch} onChange={(value)=>setPitch(value as string)} id='pitch' preview='edit' height={300} style={{borderRadius: 20,overflow:'hidden' }} textareaProps={{placeholder:'Briefly describe your startup and its value proposition'}} previewOptions={{
                disallowedElements:['style']
            }}/>
            {error.pitch && <p className='startup-form_error'>{error.pitch}</p>}
        </div>
        <Button type='submit' className='startup-form_btn text-white' disabled={isPending}>{isPending ? 'Submitting...' : 'Submit Your Pitch'} <Send className='size-6 ml-2'/></Button>
    </form>
  )
}
export default StartupForm
