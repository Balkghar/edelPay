# EdelPay - Installment Payment Platform with XRPL & Flare

A modern, secure installment payment platform built on the XRP Ledger (XRPL) and Flare Network with multi-wallet support, KYC verification, and smart contract-based collateral management. Built with Next.js, TypeScript, Tailwind CSS, and Viem.

## 🎯 Overview

EdelPay enables secure buy-now-pay-later (BNPL) transactions where sellers deposit collateral that gets automatically released upon successful payment completion. The platform leverages:

- **XRPL** for payment settlement
- **Flare Network** for smart contracts and collateral management  
- **State Connector** for cross-chain payment verification
- **Multiple wallet support** for accessibility

## ✨ Key Features

### Payment Features
- ✅ **Installment Payments** - Split purchases into monthly payments
- ✅ **Collateral Management** - Seller deposits collateral via Flare smart contracts
- ✅ **Automatic Release** - Collateral released upon full payment
- ✅ **Vendor-Payer Mapping** - Link vendor and payer relationships on-chain
- ✅ **Payment Tracking** - Real-time payment history and status

### Security & Verification
- ✅ **KYC Integration** - Swiss Digital Identity verification for user onboarding
- ✅ **JWT Authentication** - Secure session management with token persistence
- ✅ **Multi-Wallet Support** - XAMAN, GEM Wallet, Crossmark
- ✅ **Cross-Chain Verification** - Flare State Connector attestation

### Smart Contract Integration
- ✅ **Custom Instructions** - Encode and execute smart account operations
- ✅ **Vault Contract** - Secure collateral storage and release logic
- ✅ **Checkpoint Contract** - Period-based collateral retrieval
- ✅ **FXRP Token** - Wrapped XRP on Flare for collateral

## 🔄 How It Works

### Buyer Flow
1. **Browse & Purchase** - Select product with installment option
2. **Deposit Collateral** - System deposits seller's collateral as security
3. **Monthly Payments** - Buyer pays monthly installments via XRPL
4. **Payment Verification** - Flare State Connector verifies on-chain payments
5. **Completion** - Upon final payment, buyer can retrieve collateral

### Seller Flow
1. **Deposit Collateral** - Seller deposits collateral for the product
2. **Verify Payer** - Map payer address for tracking
3. **Track Payments** - Monitor buyer payment progress in real-time
4. **Manage Mapping** - Register vendor-payer relationships on Flare

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- XRPL Testnet wallet
- Environment variables for API keys

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- XRPL Testnet wallet
- Environment variables for API keys

### Installation & Setup

1. **Clone and install**
   ```bash
   git clone <repository-url>
   cd edelPay
   pnpm install
   ```

2. **Configure environment**
   ```bash
   # Create .env.local with required variables
   cp .env.example .env.local  # if available
   ```

3. **Update `.env.local`**
   ```env
   # XUMM Integration
   NEXT_PUBLIC_XUMM_API_KEY=your-key
   XUMM_API_SECRET=your-secret
   
   # Encryption
   ENC_KEY=your-encryption-key
   
   # Flare Smart Contracts
   VAULT_CONTRACT_ADDRESS=0x...
   DEPOSIT_AMOUNT=1000000000000000000
   
   # XRPL Issuer
   ISSUER_SECRET=your-issuer-seed
   ```

4. **Run development server**
   ```bash
   pnpm dev
   ```
   Navigate to [http://localhost:3000](http://localhost:3000)

5. **Production build**
   ```bash
   pnpm build
   pnpm start
   ```

## 🔑 Supported Wallets

| Wallet | Type | Link |
|--------|------|------|
| **XAMAN** | QR-based Mobile | [xumm.app](https://xumm.app/) |
| **GEM Wallet** | Browser Extension | [gemwallet.app](https://gemwallet.app/) |
| **Crossmark** | Multi-signature | [crossmark.io](https://crossmark.io/) |

## 🔐 User Authentication & Flow

### Buyer Journey
1. User lands on `http://localhost:3000`
2. Middleware redirects to `/kyc` (if not onboarded)
3. User connects wallet (XUMM, GEM, or Crossmark)
4. Complete KYC verification with Edel-ID
5. Redirected to `/buyer-dashboard` upon success

### Seller Journey
1. Connect wallet via header
2. Complete KYC verification
3. Access `/seller-dashboard` to manage listings
4. Register vendor-payer mappings for new purchases
5. Monitor payment progress in real-time

### Session Management
- JWT tokens stored in cookies with expiration
- Automatic logout on token expiry
- Session data persists across page reloads
- Manual logout clears all user data

## 📄 Key Pages & Features

### Buyer Dashboard (`/buyer-dashboard`)
- 📊 **Payment Overview** - Total paid, remaining balance, progress
- 💳 **Monthly Payments** - Pay installments with XUMM signature
- 📜 **Payment History** - Full transaction ledger
- 🔄 **Collateral Retrieval** - Claim collateral after final payment

**Flare Integration:**
- Deposit collateral via smart contracts
- Real-time balance tracking
- Automatic collateral release on completion

### Seller Dashboard (`/seller-dashboard`)
- 👥 **Customer Management** - View all buyers and their status
- 📈 **Sales Statistics** - Total revenue, active plans, overdue payments
- 🗺️ **Vendor Mapping** - Register buyer-seller relationships on-chain
- 💰 **Collateral Deposit** - Manage secured deposits

### KYC Verification (`/kyc`)
- **Edel-ID Integration** - Age & identity verification
- **Real-time Status** - SSE updates during verification
- **Multi-role Support** - Separate flows for buyers and sellers
- **Auto-redirect** - Seamless redirect on completion

### Payer Page (`/payer`)
- Send XRP to any address
- Optional credential offers for KYC
- Transaction validation and error handling

## 🧠 Smart Contract Integration

### Flare API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/flare/add-mapping-vendor-instructions` | POST | Register vendor-payer mapping |
| `/api/flare/deposit-custom-instructions` | POST | Deposit collateral for purchase |
| `/api/flare/retrieve-full-instructions` | POST | Retrieve collateral after payment |
| `/api/flare/approve-fxrp-custom-instructions` | POST | Approve FXRP token spending |

### Smart Contracts Used

1. **Vault** - Secure collateral storage
   - `depositCollateral()` - Store funds
   - `addVendorPayer()` - Register relationships
   - `retrieveCollateral()` - Release on success

2. **Checkpoint** - Period-based collateral retrieval
   - `retrievePeriodCollateral()` - Release funds per period

3. **CustomInstructionsFacet** - Instruction encoding
   - `encodeCustomInstruction()` - Encode smart account calls
   - `registerCustomInstruction()` - Register new instructions

## 🛠️ Technology Stack

### Frontend

- **Next.js 14** - React framework with SSR/SSG
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Shadcn UI** - Component library

### Backend

- **Next.js API Routes** - Serverless functions
- **Node.js** - JavaScript runtime
- **JWT** - Authentication tokens
- **Cookies** - Session storage

### Blockchain & Web3

- **Viem** - Ethereum client library
- **XRPL** - XRP Ledger SDK
- **XUMM SDK** - XUMM wallet integration
- **@gemwallet/api** - GEM wallet support
- **@crossmarkio/sdk** - Crossmark integration
- **Flare Smart Accounts** - Account abstraction on Flare

### Other Libraries

- **qrcode** - QR code generation
- **react-cookie** - Cookie management
- **jsonwebtoken** - JWT handling
- **encryption** - User data encryption

## 🔄 Data Flow Architecture

```
┌─────────────────────────────────────┐
│         User Wallets                │
│  (XAMAN, GEM, Crossmark)            │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│      EdelPay Frontend                │
│    (Next.js + React + Tailwind)     │
└──────────────┬──────────────────────┘
               │
      ┌────────┴────────┐
      ▼                 ▼
┌──────────────┐  ┌──────────────────┐
│ XRPL Payment │  │  Flare Smart     │
│  Settlement  │  │   Contracts      │
└──────────────┘  └──────────────────┘
      │                 │
      └────────┬────────┘
               ▼
      ┌─────────────────┐
      │  State Connector│
      │ (Cross-chain    │
      │  Verification)  │
      └─────────────────┘
```

## 📋 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_XUMM_API_KEY` | XUMM public API key | `abc123...` |
| `XUMM_API_SECRET` | XUMM secret key | `secret123...` |
| `ENC_KEY` | Encryption key for user data | `randomkey123` |
| `VAULT_CONTRACT_ADDRESS` | Flare Vault contract address | `0x...` |
| `DEPOSIT_AMOUNT` | Default collateral amount | `1000000000000000000` |
| `ISSUER_SECRET` | XRPL issuer seed for transactions | `sXXXXXXX...` |

## 🐛 Troubleshooting

### Wallet Connection Issues
- Ensure wallet extension is installed and unlocked
- Verify XUMM API keys in `.env.local`
- Check network connectivity to XRPL

### KYC Verification Failures
- Verify Edel-ID service is operational
- Clear browser cookies and cache
- Try in a private/incognito window

### Smart Contract Errors
- Confirm `VAULT_CONTRACT_ADDRESS` is correct
- Check `ISSUER_SECRET` is valid XRPL seed
- Verify sufficient XRP for transaction fees

### Middleware Redirect Issues
- Clear all cookies: `Ctrl+Shift+Delete`
- Restart development server
- Check `src/middleware.ts` configuration

## 📚 Resources & Documentation

### XRPL & Blockchain
- [XRP Ledger Docs](https://xrpl.org/)
- [Flare Network](https://flare.network/)
- [State Connector](https://docs.flare.network/tech/state-connector/)

### Development Tools
- [Next.js Documentation](https://nextjs.org/docs)
- [Viem Documentation](https://viem.sh)
- [XUMM Dev Portal](https://apps.xumm.dev/)
- [GEM Wallet Docs](https://gemwallet.app/docs)

### Additional Links
- [Edel-ID](https://edel-id.ch/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📄 License

MIT License - see LICENSE file for details

---

**Last Updated:** February 8, 2026  
**Version:** 1.0.0  
**Status:** Active Development

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

