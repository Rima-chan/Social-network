import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Log from "../../components/Log";

function Home() {
  return (
    <div className="flex flex-col items-center h-screen">
      <Header />
      <main className="flex flex-col flex-grow items-center bg-red-50 shadow-inner w-screen">
        <Log login={true} signup={false}></Log>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
