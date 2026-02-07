# EdelPay - Secure Payment Platform with XRPL Integration

A modern, secure payment platform built on the XRP Ledger (XRPL) with multi-wallet support, KYC verification, and subscription management. Built with Next.js, TypeScript, and Tailwind CSS.

## 🎯 Features

### Core Features

- **Multi-Wallet Support**: Connect with XUMANN, GEM, and Crossmark wallets
- **KYC Verification**: Integrated Edel-ID verification for user onboarding
- **Subscription Management**: Manage subscriptions and recurring payments
- **Installment Payments**: Support for installment-based purchases
- **Payment History**: Track all transactions and payment history
- **JWT Authentication**: Secure session management with token persistence
- **Smart Routing**: Automatic redirection based on user authentication status

### Security Features

- JWT-based authentication with cookie persistence
- User session management with wallet verification
- Automatic logout and session handling
- Encryption of sensitive user data

### User Flows

1. **Not Connected Users** → KYC Page (for verification)
2. **Connected but Not Onboarded** -> KYC Page (for verification)
3. **Connected and Onboarded** → Dashboard (payment management)

## 🏗️ Project Structure

```
src/
├── pages/
│   ├── index.tsx              # Home page (auto-redirects)
│   ├── kyc.tsx                # KYC verification with Edel-ID
│   ├── dashboard.tsx          # Main dashboard for payments
│   ├── payer.tsx              # Payment sending interface
│   ├── seller.tsx             # Seller dashboard (coming soon)
│   ├── onboarding.tsx         # Onboarding flow
│   ├── _app.tsx               # App wrapper with WalletProvider
│   ├── _document.tsx          # Document wrapper with favicons
│   └── api/                   # Backend API routes
│       ├── auth/              # Authentication endpoints
│       ├── check-verification/# Verification status checks
│       └── issuer/            # Credential issuing
├── components/
│   ├── WalletHeader.tsx       # Navigation header with wallet status
│   ├── CredentialOfferButton.tsx
│   └── ui/                    # Shadcn UI components
├── contexts/
│   └── WalletContext.tsx      # Global wallet state management
├── hooks/
│   ├── useWallet.ts           # Multi-wallet connection hook
│   └── useXRPLPayment.ts      # Payment processing hook
├── lib/
│   └── xrpl/                  # XRPL utilities
├── styles/
│   └── globals.css            # Global styles
└── middleware.ts              # Next.js routing middleware
```

## 🔑 Supported Wallets

- **[XUMM/XAMAN](https://xumm.app/)** - QR-based wallet connection
- **[GEM Wallet](https://gemwallet.app/)** - Browser extension wallet
- **[Crossmark](https://crossmark.io/)** - Multi-signature wallet

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- XRPL wallet (one of the supported wallets above)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd edelPay
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Setup environment variables**
   - Copy `.env.template` to `.env.local`

   ```bash
   cp .env.template .env.local
   ```

4. **Configure your keys**
   Edit `.env.local` and add:
   - **XUMM API Keys**: Get from [XUMM Dev Portal](https://apps.xumm.dev/)
   - **ENC_KEY**: Encryption key for storing user addresses (generate any random string)

   Example `.env.local`:

   ```
   NEXT_PUBLIC_XUMM_API_KEY=your-api-key-here
   XUMM_API_SECRET=your-secret-here
   ENC_KEY=your-encryption-key-here
   ```

### Running the Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Building for Production

```bash
npm run build
npm start
```

## 🔄 User Authentication Flow

### Login Flow

1. User lands on `http://localhost:3000`
2. Middleware redirects to `/kyc` (not connected/not onboarded)
3. User connects wallet (XUMM, GEM, or Crossmark)
4. User completes KYC verification with Edel-ID
5. After completion: redirect to `/dashboard`

### Dashboard Access

- Connected + Onboarded users can access `/dashboard`
- Try accessing `/dashboard` without credentials → redirects to `/kyc`
- All session data persists in cookies

### Logout

- Click logout in header
- Session is cleared
- Redirected back to `/kyc`

## 📄 Key Pages

### KYC Verification (`/kyc`)

- Integrated Edel-ID verification
- Collects: Age verification (18+), first name, last name
- Server-Sent Events (SSE) for real-time verification status
- Auto-redirect to dashboard on success

### Dashboard (`/dashboard`)

- **Subscriptions**: View and manage active subscriptions
- **Payment History**: Track all past transactions
- **Installments**: Manage installment-based products
- **Wallet Info**: View connected wallet address

### Payer (`/payer`)

- Send XRP payments to other addresses
- Payment amount and recipient validation
- Credential offering for KYC verification

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

### XRPL Integration

- **xumm-sdk** - XUMM wallet integration
- **@gemwallet/api** - GEM wallet integration
- **@crossmarkio/sdk** - Crossmark wallet integration
- **ripple-keypairs** - XRPL key generation
- **verify-xrpl-signature** - Signature verification

### Other

- **qrcode** - QR code generation
- **react-cookie** - Cookie management
- **jsonwebtoken** - JWT handling

## 🔐 Routing & Middleware

### Middleware Rules (`src/middleware.ts`)

- `/` → redirects to `/kyc` if not onboarded, `/dashboard` if onboarded
- `/dashboard` → redirects to `/kyc` if not onboarded
- `/kyc` → redirects to `/dashboard` if already onboarded

### WalletContext

Manages global state:

- `xrpAddress` - Connected wallet address
- `kycCompleted` - KYC verification status
- `isContextLoaded` - Context initialization flag
- Wallet connection methods (XUMM, GEM, Crossmark)

## 📝 Environment Variables

| Variable                   | Description                  | Example        |
| -------------------------- | ---------------------------- | -------------- |
| `NEXT_PUBLIC_XUMM_API_KEY` | XUMM public API key          | `abc123...`    |
| `XUMM_API_SECRET`          | XUMM secret key              | `secret123...` |
| `ENC_KEY`                  | Encryption key for user data | `randomkey123` |

## 🎨 UI Components

### Page Structure

- All pages include `Head` component for SEO (page titles + descriptions)
- `WalletHeader` - Navigation bar with wallet status
- Responsive design for desktop and mobile
- Tailwind CSS + Shadcn UI components

### Available Pages

- KYC Verification
- Dashboard
- Payer
- Onboarding

## 🐛 Troubleshooting

### Wallet Not Connecting

- Ensure you have the wallet extension installed
- Check XUMM API keys in `.env.local`
- Verify wallet is unlocked

### KYC Not Completing

- Ensure Edel-ID service is accessible
- Check network connectivity
- Try refreshing the page

### Middleware Redirects Not Working

- Clear browser cookies
- Restart development server
- Check `src/middleware.ts` configuration

## 📚 Resources

- [XRPL Documentation](https://xrpl.org/)
- [Next.js Documentation](https://nextjs.org/docs)
- [XUMM Dev Portal](https://apps.xumm.dev/)
- [GEM Wallet Docs](https://gemwallet.app/)
- [Crossmark Docs](https://crossmark.io/)
- [Edel-ID](https://edel-id.ch/)

## 📄 License

This project is private and proprietary.

## 👥 Contributors

- Development team

---

**Last Updated**: February 7, 2026

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) ; learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
