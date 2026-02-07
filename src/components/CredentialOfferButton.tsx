import React, { useState } from "react";

type Props = {
  subjectAddress?: string; // optional, fallback to connected address if you provide one
  label?: string;
};

export default function CredentialOfferButton({ subjectAddress, label = "Offer Credential" }: Props) {
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleOffer = async () => {
    setError(null);
    setLoading(true);

    try {
      if (!subjectAddress) throw new Error("subjectAddress missing");

      const resp = await fetch("/api/issuer/credential-offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjectAddress }),
      });

      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "Server error");

      setQrUrl(data.payload.refs.qr_png);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleOffer} disabled={loading} className="primary-button">
        {loading ? "Preparing..." : label}
      </button>

      {error && <div className="error-message">{error}</div>}

      {qrUrl && (
        <div className="qr-code-container">
          <p>Scan this Xumm QR to accept the credential offer:</p>
          <img src={qrUrl} alt="Credential offer QR" />
        </div>
      )}
    </div>
  );
}
