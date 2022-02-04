import MainLogo from "../assets/icon-above-font2.png";

export default function Header() {
  return(
    <header className="max-w-sm py-5">
      <img src={MainLogo} alt="Logo groupomania" className="h-24"></img>
    </header>
  )
}