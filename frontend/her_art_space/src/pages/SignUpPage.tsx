import '@/components/SignupPage.css'
import { SignUpForm } from "@/components/SignUpForm"

export default function SignUpPage(){
    // #75DAFD, #FEAD94,  #FCFF64, #3193F9
    return(
        <>
            <section className="w-screen h-screen flex flex-col items-center justify-center ">
                <SignUpForm />
            </section>
        </>
    )
}