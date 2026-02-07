import React from 'react';

interface HelloWorldFeedbackProps {
  stage: 'idle' | 'xrpl_sent' | 'fdc_waiting' | 'polling' | 'success' | 'error';
  pollCount: number;
  maxAttempts: number;
  lastPollTime: Date | null;
  error: string | null;
  elapsedTime: number;
}

export const HelloWorldFeedback: React.FC<HelloWorldFeedbackProps> = ({
  stage,
  pollCount,
  maxAttempts,
  lastPollTime,
  error,
  elapsedTime,
}) => {
  const formatElapsedTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  const getProgress = () => {
    if (stage === 'polling' && maxAttempts > 0) {
      return (pollCount / maxAttempts) * 100;
    }
    return 0;
  };

  switch (stage) {
    case 'idle':
      return null;

    case 'xrpl_sent':
      return (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🚀</span>
            <div>
              <h4 className="font-semibold text-green-800">Transaction envoyée sur XRPL !</h4>
              <p className="text-green-700 text-sm">Votre transaction XUMM a été confirmée avec succès</p>
            </div>
          </div>
        </div>
      );

    case 'fdc_waiting':
      return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-2">
            <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
            <div>
              <h4 className="font-semibold text-blue-800">Les validateurs Flare sécurisent votre message</h4>
              <p className="text-blue-700 text-sm">Attente FDC - Connexion XRPL ↔ Flare en cours...</p>
            </div>
          </div>
        </div>
      );

    case 'polling':
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="animate-pulse w-5 h-5 bg-yellow-500 rounded-full"></div>
              <div>
                <h4 className="font-semibold text-yellow-800">Vérification du contrat Flare</h4>
                <p className="text-yellow-700 text-sm">
                  Polling en cours... ({pollCount}/{maxAttempts} tentatives)
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-yellow-200 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgress()}%` }}
              ></div>
            </div>

            {/* Detailed Info */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-white p-2 rounded border">
                <span className="text-gray-600">Temps écoulé:</span>
                <div className="font-mono font-semibold">{formatElapsedTime(elapsedTime)}</div>
              </div>
              <div className="bg-white p-2 rounded border">
                <span className="text-gray-600">Dernier check:</span>
                <div className="font-mono font-semibold">
                  {lastPollTime ? lastPollTime.toLocaleTimeString() : 'N/A'}
                </div>
              </div>
            </div>

            {/* Live Updates */}
            <div className="bg-white p-2 rounded border text-xs">
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-gray-600">Status: </span>
                <span className="font-mono">
                  Attente de la mise à jour du message via FDC...
                </span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'success':
      return (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-3xl">🎉</span>
            <div>
              <h4 className="font-semibold text-green-800">Message mis à jour sur Flare !</h4>
              <p className="text-green-700 text-sm">
                Terminé en {formatElapsedTime(elapsedTime)} après {pollCount} vérifications
              </p>
            </div>
          </div>
        </div>
      );

    case 'error':
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex items-start space-x-2">
            <span className="text-2xl">❌</span>
            <div className="flex-1">
              <h4 className="font-semibold text-red-800">Erreur de mise à jour</h4>
              <p className="text-red-700 text-sm mt-1">{error}</p>
              <div className="mt-2 text-xs text-red-600">
                <p>Temps écoulé: {formatElapsedTime(elapsedTime)}</p>
                <p>Tentatives: {pollCount}/{maxAttempts}</p>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};