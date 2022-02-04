import { useSelector } from "react-redux";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { selectUserLogInfos} from '../../utils/selectors'

function AllPostsView() {
    const { username, avatar, userId, isAdmin } = useSelector(selectUserLogInfos);
    return(
        <>
        <div className="flex flex-col items-center h-screen bg-red-50">
            <Header />
            <main className="flex flex-col flex-grow items-center shadow-md w-3/4 rounded-lg bg-white">
                <h2>Bienvenue { username ? username + " 🙂" : " 🙂"} </h2>
            </main>
            <Footer />
        </div>
        </>
    )
}

export default AllPostsView;