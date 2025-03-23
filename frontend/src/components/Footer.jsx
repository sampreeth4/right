function Footer() {
    const currentYear = new Date().getFullYear()
  
    return (
      <footer className="footer bg-secondary text-white p-4 text-center">
        <div className="text-xs text-muted-foreground text-center mt-2">
          <p>Free Research Preview. This application does not provide legal advice, consult with a qualified attorney for specific legal guidance. <span className="text-primary font-medium">Visionary Rights {currentYear}</span></p>
        </div>
      </footer>
    )
  }
  
  export default Footer
  
  