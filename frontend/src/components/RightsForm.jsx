"use client"

import { useState } from "react"
import { FaGavel, FaArrowRight, FaGlobe } from "react-icons/fa"

function RightsForm({ onSubmit, disabled }) {
  const [situation, setSituation] = useState("")
  const [language, setLanguage] = useState("English")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (situation.trim()) {
      setIsProcessing(true)
      await onSubmit(situation, language)
      setIsProcessing(false)
    }
  }

  const commonLanguages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Russian",
    "Arabic",
    "Hindi",
    "Japanese",
    "Portuguese",
    "Italian",
  ]

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
        <p>Provide details about your legal situation in any language, and we'll help you understand your rights.</p>
      </div>

      <form onSubmit={handleSubmit} className="rights-form">
        <div className="language-selector">
          <label htmlFor="language">
            <FaGlobe className="language-icon" /> Select Your Language:
          </label>
          <div className="language-input-container">
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="language-select"
              disabled={disabled || isProcessing}
            >
              {commonLanguages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>
            {language === "Other" && (
              <input
                type="text"
                placeholder="Enter your language"
                className="custom-language-input"
                onChange={(e) => setLanguage(e.target.value)}
                disabled={disabled || isProcessing}
              />
            )}
          </div>
        </div>

        <textarea
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
          placeholder={`Describe your situation in ${language}...`}
          rows={6}
          disabled={disabled || isProcessing}
          required
        />
        <button
          type="submit"
          className="submit-button primary-button"
          disabled={disabled || isProcessing || !situation.trim()}
        >
          {isProcessing ? "Processing..." : "Get Your Rights"} {!isProcessing && <FaArrowRight />}
        </button>
      </form>

      <div className="example-situations">
        <h3>Example Situations:</h3>
        <div className="example-buttons">
          {exampleSituations.map((example, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(example)}
              className="example-button"
              disabled={disabled || isProcessing}
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RightsForm

