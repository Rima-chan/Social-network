import Footer from "../../components/Footer";
import MainLogo from '../../assets/icon-above-font2.png';
import SignUpForm from "../../components/SignUpForm";
import SignUp from "../../components/SignUp";

function Signup() {
    return (
        <div className="flex flex-col items-center w-screen h-screen">
            <div className="max-w-sm py-5">
                <img src={ MainLogo } alt="Logo groupomania" className="h-24"></img>
            </div>
            <main className="container flex flex-col flex-grow items-center bg-red-50 shadow-inner w-screen">
                <SignUp></SignUp>
            </main>
            <Footer></Footer>
        </div>
    )
}

export default Signup;