function Footer() {
    const currentYear = new Date().getFullYear()
  
    return (
      <footer className="footer">
        <p>Know Your Rights © {currentYear} | Educational purposes only</p>
        <p>
          This application does not provide legal advice. Consult with a qualified attorney for specific legal guidance.
        </p>
      </footer>
    )
  }
  
  export default Footer
  
  