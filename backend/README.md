# 🧠 EdelPay Verification Backend

This is the backend service for the **EdelPay verification flow**.  
It exposes endpoints to start and monitor **Edel‑ID verifications**.

Written in **TypeScript + Express**, it runs in **CommonJS mode** so `ts-node-dev` works without ESM headaches.

---

## 🚀 What This Backend Does

- 📩 Start a verification process (returns QR code URL)
- 📡 Stream real-time verification updates via SSE (Server-Sent Events)

---

## 🧾 Requirements

- Node.js >= 18
- npm
- git (if cloning)

---

## 📦 Installation

```bash
cd backend
npm install

▶️ Running the Backend

npm run dev
```

Expected output:
`Backend running on http://localhost:8090`

Server listens on port 8090.
📡 API Endpoints
🔹 1) Start Verification

POST /api/start-verification

Description:
Starts a verification and returns a verification ID and QR code URL.

Request Body (JSON):

```json
{
  "verificationClaims": ["$.age_over_18", "$.given_name", "$.family_name"]
}
```

Response:

```json
{
  "id": "some-verification-id",
  "verification_url": "https://verifier.edel-id.ch/qr/xxxxxxxx"
}
```

Display verification_url as a QR code for the user 📱

🔹 2) Check Verification (SSE)

POST /api/check-verification/:id

Description:
Relays Server-Sent Events updates from the verifier.

Params:

:id → Verification ID returned from /api/start-verification

Request Body (JSON): Same as above.

Response:
Streams updates continuously in the format:

```json
{
"state": "PENDING" | "SUCCESS" | "FAILED",
"verifiedClaims": [
      { "age_over_18": "true" },
      { "given_name": "Igor" },
      { "family_name": "Germano" }
   ]
}
```

🧠 About the Claims

Currently requested claims:

`$.age_over_18` → Boolean ✅

`$.given_name` → First name 📝

`$.family_name` → Last name 📝

🧪 Usage with Frontend

- Frontend calls POST /api/start-verification

- Backend returns { id, verification_url }

- Frontend shows QR code with verification_url

- Frontend connects to SSE:

- new EventSource("/api/check-verification/" + id)

Backend relays verification state and claims in real-time until the process finishes ✅
