import MainLogo from '../../assets/icon-above-font2.png';
import LoginForm from '../../components/LoginForm';
import Footer from '../../components/Footer';

function Home() {
    return(
            <div className="flex flex-col items-center w-screen h-screen">
            <div className="max-w-sm py-5">
                <img src={ MainLogo } alt="Logo groupomania" className="h-24"></img>
            </div>
            <main className="container flex flex-col flex-grow items-center bg-red-50 shadow-inner w-screen">
                <LoginForm></LoginForm>
            </main>
            <Footer></Footer>
            </div>
    )
}

export default Home;