import { FaBalanceScale } from "react-icons/fa"
import { AuroraText } from "./magicui/aurora-text"

function Header() {
  return (
    <header className="header flex flex-col md:flex-row items-center justify-between p-4 bg-white text-black">
      <div className="logo flex items-center mb-2 md:mb-0">
        <h1 className="text-2xl font-bold ml-2">
          <AuroraText></AuroraText>Know Your Rights
        </h1>
      </div>
    </header>
  )
}

export default Header

