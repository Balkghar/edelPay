import React, { useState } from "react";
import Image from 'next/image';

type Props = {
  subjectAddress?: string;
  label?: string;
};

export default function CredentialOfferButton({
                                                subjectAddress,
                                                label = "Get KYC Credential",
                                              }: Props) {
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOffer = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!subjectAddress) {
        throw new Error("subjectAddress missing");
      }

      const resp = await fetch("/api/xrpl-credentials/credential-offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjectAddress }),
      });

      if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(txt);
      }

      const data = await resp.json();
      setQrUrl(data.payload.refs.qr_png);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleOffer} disabled={loading}>
        {loading ? "Preparing..." : label}
      </button>

      {error && <div style={{ color: "red" }}>{error}</div>}

      {qrUrl && (
        <div>
          <p>Scan with Xaman to accept the credential</p>
          <Image 
            src={qrUrl} 
            alt="XUMM QR" 
            width={200} 
            height={200} 
          />
        </div>
      )}
    </div>
  );
}
