"use client"

import { useState } from "react"
import "./App.css"
import Header from "./components/Header"
import RightsForm from "./components/RightsForm"
import RightsResponse from "./components/RightsResponse"
import FollowUpForm from "./components/FollowUpForm"
import Footer from "./components/Footer"

function App() {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentSituation, setCurrentSituation] = useState("")
  const [conversationHistory, setConversationHistory] = useState([])

  const handleSubmit = async (situation, isFollowUp = false) => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("http://localhost:3001/api/rights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ situation }),
      })

      if (!res.ok) {
        throw new Error("Failed to get response")
      }

      const data = await res.json()
      setResponse(data)

      // Update conversation history
      if (isFollowUp) {
        setConversationHistory([
          ...conversationHistory,
          { type: "follow-up", content: situation },
          { type: "response", content: data },
        ])
      } else {
        setCurrentSituation(situation)
        setConversationHistory([
          { type: "situation", content: situation },
          { type: "response", content: data },
        ])
      }
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
    setConversationHistory([])
  }

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {!response && <RightsForm onSubmit={(situation) => handleSubmit(situation, false)} disabled={loading} />}

        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Analyzing your situation...</p>
          </div>
        )}

        {error && <div className="error">{error}</div>}

        {response && (
          <div className="response-container">
            <RightsResponse data={response} situation={currentSituation} />

            <div className="follow-up-container">
              <FollowUpForm
                onSubmit={(followUp) => handleSubmit(followUp, true)}
                onNewSituation={handleNewSituation}
                disabled={loading}
              />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App

