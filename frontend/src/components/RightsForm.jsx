"use client"

import { useState } from "react"
import { FaGavel, FaArrowRight, FaGlobe } from "react-icons/fa"
import { Select, SelectTrigger, SelectContent, SelectItem } from "./ui/select"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"

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
    "Russian",
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
    <div className="rights-form-container card p-4 md:p-6 lg:p-8">
      <div className="form-header mb-4">
        <div className="form-title flex items-center">
          <h2 className="text-xl font-semibold ml-2">Describe Your Situation</h2>
        </div>
        <p className="text-gray-600">Provide details about your legal situation in any language, and we'll help you understand your rights.</p>
      </div>

      <form onSubmit={handleSubmit} className="rights-form">
        <div className="language-selector">
          <label htmlFor="language">
            Select Your Language:
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
              
            </select>
            
          </div>
        </div>

        <Textarea
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
          placeholder={`Describe your situation in ${language}...`}
          rows={6}
          disabled={disabled || isProcessing}
          required
          className="w-full"
        />
        <Button
          type="submit"
          disabled={disabled || isProcessing || !situation.trim()}
          className="w-full mt-4"
        >
          {isProcessing ? "Processing..." : "Get Your Rights"} <FaArrowRight />
        </Button>
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

