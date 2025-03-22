"use client"

import { useState } from "react"
import "./App.css"
import Header from "./components/Header"
import RightsForm from "./components/RightsForm"
import RightsResponse from "./components/RightsResponse"
import Footer from "./components/Footer"

function App() {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentSituation, setCurrentSituation] = useState("")
  const [currentLanguage, setCurrentLanguage] = useState("")

  const handleSubmit = async (situation, language) => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("http://localhost:3001/api/rights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ situation, language }),
      })

      if (!res.ok) {
        throw new Error("Failed to get response")
      }

      const data = await res.json()
      setResponse(data)
      setCurrentSituation(situation)
      setCurrentLanguage(language)
    } catch (err) {
      setError("An error occurred while processing your request. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleNewSituation = () => {
    setResponse(null)
    setCurrentSituation("")
    setCurrentLanguage("")
  }

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {!response && <RightsForm onSubmit={handleSubmit} disabled={loading} />}

        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Analyzing your situation...</p>
            <p className="loading-detail">
              This may take a moment as we process your request in {currentLanguage || "your language"}
            </p>
          </div>
        )}

        {error && <div className="error">{error}</div>}

        {response && (
          <div className="response-container">
            <RightsResponse data={response} situation={currentSituation} language={currentLanguage} />

            <div className="action-buttons">
              <button onClick={handleNewSituation} className="new-situation-button">
                Start New Inquiry
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App

