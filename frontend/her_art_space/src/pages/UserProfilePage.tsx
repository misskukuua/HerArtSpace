import '@/components/SignupPage.css'
import { UserProfile } from "@/components/UserProfile"

export default function UserProfilePage(){
    // #75DAFD, #FEAD94,  #FCFF64, #3193F9
    return(
        <>
            <section className="w-screen h-screen flex flex-col items-center justify-center ">
                <UserProfile />
            </section>
        </>
    )
}