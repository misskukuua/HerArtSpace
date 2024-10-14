import { LoginForm } from "@/components/LoginForm"

export default function LoginPage(){
    // #75DAFD, #FEAD94,  #FCFF64, #3193F9
    return(
        <>
            <section className="w-screen h-screen flex flex-col items-center justify-center ">
                <LoginForm />
            </section>
        </>
    )
}