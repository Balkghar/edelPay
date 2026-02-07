import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { XRPLFlareBridge, FlareActionMemo, useXRPLFlareBridge } from '@/lib/xrplFlarebridge';
import Image from 'next/image';

interface BridgeFlowState {
  step: 'idle' | 'creating-qr' | 'waiting-signature' | 'fdc-detecting' | 'flare-executing' | 'completed' | 'error';
  xrplTxHash?: string;
  flareTxHash?: string;
  action?: FlareActionMemo;
  error?: string;
}

const XRPLFlareBridgeDemo: React.FC = () => {
  const [flowState, setFlowState] = useState<BridgeFlowState>({ step: 'idle' });
  const [selectedAction, setSelectedAction] = useState<'updateMessage' | 'depositCollateral' | 'executeContract'>('updateMessage');
  const [messageInput, setMessageInput] = useState('Hello from XRPL via FDC!');
  const [qrCodeData, setQrCodeData] = useState<any>(null);

  const { createFlareActionQR, simulateFullBridgeFlow } = useXRPLFlareBridge();

  const handleCreateBridgeAction = async () => {
    setFlowState({ step: 'creating-qr' });

    try {
      // Create Flare action based on selection
      let flareAction: FlareActionMemo;
      
      switch (selectedAction) {
        case 'updateMessage':
          flareAction = {
            action: 'updateMessage',
            target: '0xAfaBccf62bba1629e9aCF56D7DBA0a129Eb19240', // HelloWorld contract
            parameters: { message: messageInput },
            signature: 'mock_signature_' + Date.now()
          };
          break;
        case 'depositCollateral':
          flareAction = {
            action: 'depositCollateral',
            target: '0xCollateralContract123456789',
            parameters: { amount: '1000000000000000000' }, // 1 ETH in wei
            signature: 'mock_signature_' + Date.now()
          };
          break;
        case 'executeContract':
          flareAction = {
            action: 'executeContract',
            target: '0xGenericContract123456789',
            parameters: { data: '0x12345678' },
            signature: 'mock_signature_' + Date.now()
          };
          break;
      }

      // Create QR code with the action
      const qrResult = await createFlareActionQR(flareAction);
      
      if (!qrResult.success) {
        throw new Error(qrResult.error);
      }

      setQrCodeData(qrResult);
      setFlowState({ step: 'waiting-signature', action: flareAction });

    } catch (error) {
      setFlowState({ 
        step: 'error', 
        error: error instanceof Error ? error.message : 'Failed to create bridge action'
      });
    }
  };

  const handleSimulateSignature = async () => {
    if (!flowState.action) return;

    try {
      setFlowState({ ...flowState, step: 'fdc-detecting' });
      
      // Simulate the full bridge flow
      const result = await simulateFullBridgeFlow(flowState.action);
      
      if (!result.success) {
        throw new Error('Bridge flow failed');
      }

      setFlowState({
        step: 'completed',
        action: flowState.action,
        xrplTxHash: result.xrplTxHash,
        flareTxHash: result.flareTxHash
      });

    } catch (error) {
      setFlowState({
        step: 'error',
        error: error instanceof Error ? error.message : 'Bridge flow failed'
      });
    }
  };

  const resetDemo = () => {
    setFlowState({ step: 'idle' });
    setQrCodeData(null);
    setMessageInput('Hello from XRPL via FDC!');
  };

  const getStepDescription = () => {
    switch (flowState.step) {
      case 'creating-qr':
        return '🔗 Creating XRPL transaction with encrypted Flare memo...';
      case 'waiting-signature':
        return '📱 Waiting for XUMM signature - Scan the QR code!';
      case 'fdc-detecting':
        return '🔍 FDC is detecting the XRPL transaction...';
      case 'flare-executing':
        return '⚡ Executing action on Flare Smart Account...';
      case 'completed':
        return '✅ Bridge flow completed successfully!';
      case 'error':
        return '❌ Error occurred during bridge flow';
      default:
        return '🚀 Ready to create XRPL-Flare bridge action';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          🌉 XRPL ↔ Flare Bridge Demo
        </h3>
        <p className="text-gray-600 text-sm">
          Create XRPL transactions with encrypted memos that trigger Flare Smart Account actions via FDC
        </p>
      </div>

      {/* Flow Status */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">Bridge Flow Status</h4>
        <p className="text-blue-800 text-sm">{getStepDescription()}</p>
        
        {flowState.step !== 'idle' && (
          <div className="mt-3 flex items-center space-x-2">
            {flowState.step !== 'completed' && flowState.step !== 'error' && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            )}
            <div className="text-xs text-blue-600">
              Step: {flowState.step.replace('-', ' ').toUpperCase()}
            </div>
          </div>
        )}
      </div>

      {/* Configuration */}
      {flowState.step === 'idle' && (
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Flare Action
            </label>
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="updateMessage">Update HelloWorld Message</option>
              <option value="depositCollateral">Deposit Collateral</option>
              <option value="executeContract">Execute Generic Contract</option>
            </select>
          </div>

          {selectedAction === 'updateMessage' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message to Update
              </label>
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Enter message for HelloWorld contract..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <Button
            onClick={handleCreateBridgeAction}
            disabled={!messageInput.trim() && selectedAction === 'updateMessage'}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            🚀 Create XRPL → Flare Bridge Action
          </Button>
        </div>
      )}

      {/* QR Code Display */}
      {flowState.step === 'waiting-signature' && qrCodeData && (
        <div className="mb-6">
          <h4 className="text-lg font-medium text-gray-900 mb-3">Scan with XUMM Wallet</h4>
          
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            {qrCodeData.qrCode ? (
              <div className="space-y-3">
                <Image
                  src={qrCodeData.qrCode}
                  alt="XUMM QR Code for Flare Action"
                  width={200}
                  height={200}
                  className="mx-auto border border-gray-200 rounded-lg"
                />
                <p className="text-sm text-gray-600">
                  This QR contains an XRPL payment with encrypted Flare action memo
                </p>
                
                <div className="text-xs text-gray-500 bg-white p-2 rounded border">
                  <strong>Encrypted Memo Preview:</strong><br/>
                  Action: {flowState.action?.action}<br/>
                  Target: {flowState.action?.target}<br/>
                  Parameters: {JSON.stringify(flowState.action?.parameters)}
                </div>
              </div>
            ) : (
              <div className="py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-gray-600">Generating QR Code...</p>
              </div>
            )}
          </div>

          <div className="mt-4 space-y-2">
            <Button
              onClick={handleSimulateSignature}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              🔄 Simulate XUMM Signature (Demo)
            </Button>
            
            {qrCodeData.jumpLink && (
              <Button
                onClick={() => window.open(qrCodeData.jumpLink, '_blank')}
                variant="outline"
                className="w-full"
              >
                📱 Open in XUMM App
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Processing Steps */}
      {(flowState.step === 'fdc-detecting' || flowState.step === 'flare-executing') && (
        <div className="mb-6 space-y-3">
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">🔍 FDC Processing</h4>
            <div className="text-yellow-800 text-sm space-y-1">
              <p>1. ✅ XRPL transaction detected</p>
              <p>2. ✅ Memo decrypted and validated</p>
              <p>3. ⏳ Smart Account action execution...</p>
            </div>
          </div>
        </div>
      )}

      {/* Completion Results */}
      {flowState.step === 'completed' && (
        <div className="mb-6 p-4 bg-green-50 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-3">🎉 Bridge Flow Completed!</h4>
          
          <div className="space-y-3 text-sm">
            <div className="bg-white p-3 rounded border">
              <strong>XRPL Transaction:</strong><br/>
              <code className="text-xs">{flowState.xrplTxHash}</code>
            </div>
            
            <div className="bg-white p-3 rounded border">
              <strong>Flare Execution:</strong><br/>
              <code className="text-xs">{flowState.flareTxHash}</code>
            </div>
            
            <div className="bg-white p-3 rounded border">
              <strong>Action Executed:</strong><br/>
              <code className="text-xs">{flowState.action?.action} on {flowState.action?.target}</code>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {flowState.step === 'error' && (
        <div className="mb-6 p-4 bg-red-50 rounded-lg">
          <h4 className="font-semibold text-red-900 mb-2">❌ Error</h4>
          <p className="text-red-800 text-sm">{flowState.error}</p>
        </div>
      )}

      {/* Reset Button */}
      {(flowState.step === 'completed' || flowState.step === 'error') && (
        <Button
          onClick={resetDemo}
          variant="outline"
          className="w-full"
        >
          🔄 Reset Bridge Demo
        </Button>
      )}

      {/* Bridge Architecture Info */}
      <div className="mt-6 pt-4 border-t text-xs text-gray-500">
        <h5 className="font-medium mb-2">🏗️ Architecture:</h5>
        <ol className="space-y-1 list-decimal list-inside">
          <li>Frontend generates XRPL transaction with encrypted memo</li>
          <li>User signs transaction with XUMM wallet</li>
          <li>FDC detects XRPL transaction and decrypts memo</li>
          <li>Smart Account on Flare executes the specified action</li>
        </ol>
      </div>
    </div>
  );
};

export default XRPLFlareBridgeDemo;