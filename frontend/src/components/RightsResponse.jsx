"use client"

import { useState } from "react"
import { FaGavel, FaClipboard, FaCheck, FaChevronDown, FaChevronUp } from "react-icons/fa"
import { Card } from "./ui/card"

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
    <Card className="rights-response p-4 md:p-6 lg:p-8">
      <div className="situation-summary mb-4 p-4 bg-gray-100 border-l-4 border-primary">
        <h3 className="text-lg font-semibold">Your Situation</h3>
        <p>{situation}</p>
      </div>

      <h2 className="text-xl font-bold mb-4">
        Your Rights <FaGavel className="section-icon inline" />
      </h2>

      <div className="response-content">
        {data.rights &&
          data.rights.map((right) => {
            const isExpanded = expandedRights[right.id] !== false // Default to expanded
            return (
              <div key={right.id} className="right-item mb-4 border rounded-lg shadow-sm">
                <div className="right-header flex justify-between items-center p-4 cursor-pointer">
                  <div className="right-title-area flex items-center">
                    <span className="right-id bg-primary text-white rounded-full px-2 py-1 mr-2">{right.id}</span>
                    <h3 className="text-lg font-semibold">{right.title}</h3>
                  </div>
                  <button className="expand-button" aria-label={isExpanded ? "Collapse" : "Expand"} onClick={() => toggleRightExpansion(right.id)}>
                    {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="right-content p-4">
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
    </Card>
  )
}

export default RightsResponse

