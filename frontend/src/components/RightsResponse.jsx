"use client"

import { useState } from "react"
import { FaGavel, FaClipboard, FaCheck, FaChevronDown, FaChevronUp } from "react-icons/fa"

function RightsResponse({ data, situation }) {
  const [expandedRights, setExpandedRights] = useState({})
  const [copiedId, setCopiedId] = useState(null)

  const toggleRightExpansion = (id) => {
    setExpandedRights({
      ...expandedRights,
      [id]: !expandedRights[id],
    })
  }

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="rights-response">
      <div className="situation-summary">
        <h3>Your Situation</h3>
        <p>{situation}</p>
      </div>

      <h2>
        Your Rights <FaGavel className="section-icon" />
      </h2>

      <div className="response-content">
        {data.rights &&
          data.rights.map((right) => {
            const isExpanded = expandedRights[right.id] !== false // Default to expanded
            return (
              <div key={right.id} className="right-item">
                <div className="right-header" onClick={() => toggleRightExpansion(right.id)}>
                  <div className="right-title-area">
                    <span className="right-id">{right.id}</span>
                    <h3>{right.title}</h3>
                  </div>
                  <button className="expand-button" aria-label={isExpanded ? "Collapse" : "Expand"}>
                    {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="right-content">
                    <p>{right.description}</p>
                    <button
                      className="copy-button"
                      onClick={(e) => {
                        e.stopPropagation()
                        copyToClipboard(`${right.title}: ${right.description}`, right.id)
                      }}
                      aria-label="Copy to clipboard"
                    >
                      {copiedId === right.id ? <FaCheck /> : <FaClipboard />}
                      <span>{copiedId === right.id ? "Copied!" : "Copy"}</span>
                    </button>
                  </div>
                )}
              </div>
            )
          })}

        {data.recommendations && (
          <div className="recommendations">
            <h3>Recommended Actions</h3>
            <ul>
              {data.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="disclaimer">
          <p>
            <strong>Disclaimer:</strong> This information is provided for educational purposes only and does not
            constitute legal advice. For specific legal guidance, please consult with a qualified attorney.
          </p>
        </div>
      </div>
    </div>
  )
}

export default RightsResponse

