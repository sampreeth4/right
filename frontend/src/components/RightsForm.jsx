"use client"

import { useState } from "react"
import { FaGavel, FaArrowRight } from "react-icons/fa"

function RightsForm({ onSubmit, disabled }) {
  const [situation, setSituation] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (situation.trim()) {
      onSubmit(situation)
    }
  }

  const exampleSituations = [
    "I was arrested without being told why.",
    "My landlord entered my apartment without notice.",
    "I was fired after reporting unsafe working conditions.",
    "Police want to search my car without a warrant.",
  ]

  const handleExampleClick = (example) => {
    setSituation(example)
  }

  return (
    <div className="rights-form-container">
      <div className="form-header">
        <div className="form-title">
          <FaGavel className="form-icon" />
          <h2>Describe Your Situation</h2>
        </div>
        <p>Provide details about your legal situation, and we'll help you understand your rights.</p>
      </div>

      <form onSubmit={handleSubmit} className="rights-form">
        <textarea
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
          placeholder="Example: I was pulled over by police and they want to search my car without a warrant..."
          rows={6}
          disabled={disabled}
          required
        />
        <button type="submit" className="submit-button primary-button" disabled={disabled || !situation.trim()}>
          Get Your Rights <FaArrowRight />
        </button>
      </form>

      <div className="example-situations">
        <h3>Example Situations:</h3>
        <div className="example-buttons">
          {exampleSituations.map((example, index) => (
            <button key={index} onClick={() => handleExampleClick(example)} className="example-button">
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RightsForm

