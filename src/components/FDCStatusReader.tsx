import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';

interface APIStatusData {
  status: boolean;
  message?: string;
  timestamp?: number; // Unix timestamp as uint32
}

interface FDCStatusState {
  isLoading: boolean;
  apiData: APIStatusData | null;
  fdcAttestation: string | null;
  error: string | null;
  lastCheck: Date | null;
}

export const FDCStatusReader: React.FC = () => {
  const [state, setState] = useState<FDCStatusState>({
    isLoading: false,
    apiData: null,
    fdcAttestation: null,
    error: null,
    lastCheck: null,
  });

  const mockFDCRead = useCallback(async (): Promise<APIStatusData> => {
    console.log('🔗 FDC: Reading external API via Flare Data Connector...');
    
    // Simulate FDC fetching from external API
    const response = await fetch('/api/status');
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('📡 FDC: Data received from API:', data);
    
    return data;
  }, []);

  const createFDCAttestation = useCallback(async (apiData: APIStatusData): Promise<string> => {
    console.log('📜 FDC: Creating Web2JSON attestation for API data...');
    
    // Web2JSON Request Body (selon les specs Flare)
    const web2JsonRequest = {
      url: `${window.location.origin}/api/status`,
      httpMethod: 'GET',
      headers: '{}', // No headers needed
      queryParams: '{}', // No query params needed
      body: '{}', // No body for GET request
      postProcessJq: '.', // Identity filter - return full JSON response
      abiSignature: `{"components": [{"internalType": "bool", "name": "status", "type": "bool"},{"internalType": "string", "name": "message", "type": "string"},{"internalType": "uint32", "name": "timestamp", "type": "uint32"}],"name": "task","type": "tuple"}` // ABI signature au format JSON pour notre réponse API
    };
    
    console.log('🔧 FDC: Web2JSON request parameters:', web2JsonRequest);
    
    // Mock FDC response body
    const mockAbiEncodedData = '0x' + Buffer.from(JSON.stringify({
      status: apiData.status,
      message: apiData.message || '',
      timestamp: apiData.timestamp || ''
    })).toString('hex');
    
    const attestationPayload = {
      sourceType: 'Web2JSON',
      request: web2JsonRequest,
      response: {
        abiEncodedData: mockAbiEncodedData,
        lowestUsedTimestamp: '0xffffffffffffffff' // Unlimited selon specs
      },
      timestamp: new Date().toISOString(),
      attestor: 'flare-fdc-validator'
    };

    // Simulate attestation ID generation (in real FDC this would be on-chain)
    const attestationId = `fdc_web2json_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    console.log('✅ FDC: Web2JSON attestation created with ID:', attestationId);
    console.log('📋 FDC: Attestation payload:', attestationPayload);
    
    return attestationId;
  }, []);

  const handleFDCRead = useCallback(async () => {
    setState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      lastCheck: new Date(),
    }));

    try {
      console.log('🚀 Starting FDC API status read...');
      
      // Step 1: FDC fetches external API data
      const apiData = await mockFDCRead();
      
      setState(prev => ({
        ...prev,
        apiData,
      }));

      // Step 2: Create FDC attestation with the API data
      const fdcAttestationId = await createFDCAttestation(apiData);
      
      setState(prev => ({
        ...prev,
        fdcAttestation: fdcAttestationId,
        isLoading: false,
      }));

      console.log('🎉 FDC read complete!');

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ FDC read failed:', errorMessage);
      
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
    }
  }, [mockFDCRead, createFDCAttestation]);

  const resetReader = useCallback(() => {
    setState({
      isLoading: false,
      apiData: null,
      fdcAttestation: null,
      error: null,
      lastCheck: null,
    });
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            📡 FDC API Status Reader
          </h3>
          <p className="text-sm text-gray-600">
            Use Flare Data Connector to read and attest /api/status endpoint
          </p>
        </div>
        
        {state.lastCheck && (
          <div className="text-xs text-gray-500">
            Last check: {state.lastCheck.toLocaleTimeString()}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-3 mb-6">
        <Button
          onClick={handleFDCRead}
          disabled={state.isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {state.isLoading ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              Reading via FDC...
            </>
          ) : (
            <>📡 Read API Status via FDC</>
          )}
        </Button>
        
        {(state.apiData || state.error) && (
          <Button
            onClick={resetReader}
            variant="outline"
            className="text-gray-600"
          >
            🔄 Reset
          </Button>
        )}
      </div>

      {/* Loading State */}
      {state.isLoading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-2">
            <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
            <div>
              <h4 className="font-semibold text-blue-800">FDC Processing</h4>
              <p className="text-blue-700 text-sm">Flare validators are reading external API...</p>
            </div>
          </div>
        </div>
      )}

      {/* API Data Display */}
      {state.apiData && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <h4 className="font-semibold text-green-800 mb-3">
            📊 API Data Retrieved
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-3 rounded border">
              <div className="text-gray-600 mb-1">Status</div>
              <div className={`font-semibold text-lg ${state.apiData.status ? 'text-green-600' : 'text-red-600'}`}>
                {state.apiData.status ? '✅ True' : '❌ False'}
              </div>
            </div>
            
            <div className="bg-white p-3 rounded border">
              <div className="text-gray-600 mb-1">Message</div>
              <div className="font-mono text-xs">
                {state.apiData.message || 'N/A'}
              </div>
            </div>
            
            <div className="bg-white p-3 rounded border">
              <div className="text-gray-600 mb-1">Timestamp</div>
              <div className="font-mono text-xs space-y-1">
                <div>Unix: {state.apiData.timestamp || 'N/A'}</div>
                {state.apiData.timestamp && (
                  <div className="text-gray-500">
                    {new Date(state.apiData.timestamp * 1000).toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FDC Attestation */}
      {state.fdcAttestation && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
          <h4 className="font-semibold text-purple-800 mb-3">
            📜 FDC Attestation Created
          </h4>
          
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-600">Attestation ID:</span>
              <code className="ml-2 bg-white px-2 py-1 rounded border font-mono text-xs">
                {state.fdcAttestation}
              </code>
            </div>
            
            <div>
              <span className="text-gray-600">Type:</span>
              <span className="ml-2 font-semibold">Web2JSON API Read</span>
            </div>
            
            <div>
              <span className="text-gray-600">Source:</span>
              <code className="ml-2 bg-white px-2 py-1 rounded border font-mono text-xs">
                /api/status
              </code>
            </div>
            
            <div className="text-xs text-purple-600 mt-3 p-2 bg-white rounded border">
              ℹ️ This attestation proves that the API returned <strong>{state.apiData?.status ? 'True' : 'False'}</strong> at Unix timestamp {state.apiData?.timestamp}
              {state.apiData?.timestamp && (
                <div className="text-gray-500 mt-1">
                  ({new Date(state.apiData.timestamp * 1000).toLocaleString()})
                </div>
              )}
            </div>
            
            <details className="mt-3">
              <summary className="text-xs text-purple-700 cursor-pointer hover:text-purple-800">
                🔧 Web2JSON Technical Details
              </summary>
              <div className="mt-2 text-xs bg-gray-50 p-2 rounded border font-mono">
                <div className="space-y-2">
                  <div><strong>URL:</strong> {window.location.origin}/api/status</div>
                  <div><strong>HTTP Method:</strong> GET</div>
                  <div><strong>jq Filter:</strong> . (identity)</div>
                  <div><strong>Lowest Timestamp:</strong> 0xffffffffffffffff (unlimited)</div>
                  <div>
                    <strong>ABI Signature:</strong>
                    <pre className="mt-1 text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`{"components": [{"internalType": "bool", "name": "status", "type": "bool"},{"internalType": "string", "name": "message", "type": "string"},{"internalType": "uint32", "name": "timestamp", "type": "uint32"}],"name": "task","type": "tuple"}`}
                    </pre>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>
      )}

      {/* Error Display */}
      {state.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="font-semibold text-red-800 mb-2">❌ FDC Error</h4>
          <p className="text-red-700 text-sm">{state.error}</p>
        </div>
      )}
    </div>
  );
};