import React from 'react'

interface FlareAttestationLoaderProps {
  stage: 'requesting' | 'validating' | 'completed' | 'failed'
  message?: string
}

const FlareAttestationLoader: React.FC<FlareAttestationLoaderProps> = ({ stage, message }) => {
  const getStageInfo = () => {
    switch (stage) {
      case 'requesting':
        return {
          title: '🔗 Requesting Flare Attestation',
          description: 'Submitting identity verification to Flare Network validators...',
          icon: '🔄',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50'
        }
      case 'validating':
        return {
          title: '⚡ Flare Validators Working',
          description: 'Decentralized validators are verifying your digital identity...',
          icon: '🛡️',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50'
        }
      case 'completed':
        return {
          title: '✅ Attestation Complete',
          description: 'Your identity has been verified and attested on Flare Network!',
          icon: '🎉',
          color: 'text-green-600',
          bgColor: 'bg-green-50'
        }
      case 'failed':
        return {
          title: '❌ Attestation Failed',
          description: 'Unable to complete the attestation process.',
          icon: '⚠️',
          color: 'text-red-600',
          bgColor: 'bg-red-50'
        }
    }
  }

  const { title, description, icon, color, bgColor } = getStageInfo()

  return (
    <div className={`p-6 rounded-lg border ${bgColor} ${color}`}>
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="text-4xl animate-bounce">
          {icon}
        </div>
        
        <div>
          <h3 className={`text-lg font-semibold ${color} mb-2`}>
            {title}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {message || description}
          </p>
        </div>

        {(stage === 'requesting' || stage === 'validating') && (
          <div className="flex items-center space-x-2">
            <div className={`animate-spin rounded-full h-4 w-4 border-b-2 ${color.replace('text-', 'border-')}`}></div>
            <span className="text-xs text-gray-500">
              {stage === 'requesting' ? 'Connecting to Flare...' : 'Validating on-chain...'}
            </span>
          </div>
        )}

        {stage === 'validating' && (
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div className="bg-yellow-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
          </div>
        )}

        <div className="text-xs text-gray-400 mt-2 space-y-1">
          <div className="flex items-center justify-center space-x-4">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span>Flare Network</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>Web2JSON</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlareAttestationLoader