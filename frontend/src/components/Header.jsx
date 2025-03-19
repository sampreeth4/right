import { FaBalanceScale } from "react-icons/fa"

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <FaBalanceScale className="gavel-icon" />
        <h1>Know Your Rights</h1>
      </div>
      <p className="tagline">Understand your legal rights in any situation</p>
    </header>
  )
}

export default Header

