"use client"

import { useState } from "react"
import { FaArrowRight, FaRedo } from "react-icons/fa"

function FollowUpForm({ onSubmit, onNewSituation, disabled }) {
  const [followUp, setFollowUp] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (followUp.trim()) {
      onSubmit(followUp)
      setFollowUp("")
    }
  }

  return (
    <div className="follow-up-form-container card">
      <h3 className="text-lg font-semibold">Need more information?</h3>
      <p>Ask a follow-up question or describe a new situation.</p>

      <form onSubmit={handleSubmit} className="follow-up-form">
        <textarea
          value={followUp}
          onChange={(e) => setFollowUp(e.target.value)}
          placeholder="Example: What if the police officer didn't read me my rights?"
          rows={3}
          className="border rounded-md p-2 mb-4"
          disabled={disabled}
          required
        />
        <button
          type="submit"
          className="submit-button primary-button"
          disabled={disabled || !followUp.trim()}
          aria-label="Submit follow-up question"
        >
          <FaArrowRight />
        </button>
      </form>

      <div className="new-situation-container">
        <button onClick={onNewSituation} className="new-situation-button primary-button" disabled={disabled}>
          <FaRedo /> Start New Situation
        </button>
      </div>
    </div>
  )
}

export default FollowUpForm

