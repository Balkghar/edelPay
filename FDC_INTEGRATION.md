# 🔗 Intégration FDC (Flare Data Connector) 

## 🎯 Vue d'ensemble

Cette intégration permet de créer des **attestations blockchain** des vérifications d'identité Edel-ID sur le réseau **Flare Network** via le protocole **FDC (Flare Data Connector)**.

## 🏗️ Architecture

### Composants ajoutés

1. **`src/lib/flare.ts`** - Configuration et utilitaires Flare Network
2. **`src/hooks/useFDCAttestation.ts`** - Hook React pour gérer les attestations
3. **`src/components/FlareAttestationLoader.tsx`** - Interface de chargement sympa
4. **Page KYC modifiée** - Intégration du flux d'attestation

### Flow d'attestation

```
Vérification Edel-ID ✅
        ↓
Bouton "Create Flare Attestation" 🔗
        ↓
Connexion wallet (MetaMask/etc.) 
        ↓
Appel requestAttestation() sur FDC Hub
        ↓
Attente validation par les validateurs Flare ⚡
        ↓
Attestation complète sur blockchain 🎆
```

## 🎮 Utilisation

### 1. Démarrer l'application
```bash
cd /home/daydozkosmos/ETH_Oxford/edelPay
pnpm dev
```

### 2. Navigation
- Allez sur `http://localhost:3000/kyc`
- Complétez la vérification Edel-ID (scan du QR code)
- Une fois la vérification réussie, cliquez sur **"🔗 Create Flare Attestation"**

### 3. Processus d'attestation
- Connectez votre wallet (MetaMask recommandé)
- Confirmez la transaction sur Flare Testnet
- Attendez la validation par les validateurs Flare
- Récupérez votre attestation blockchain !

## ⚙️ Configuration

### Contrats FDC (à mettre à jour)
```typescript
// src/lib/flare.ts
export const FDC_CONTRACTS = {
  FDC_HUB: '0x0000000000000000000000000000000000000999', // ⚠️ Remplacer par adresse réelle
  WEB2JSON_ATTESTOR: '0x0000000000000000000000000000000000000998' // ⚠️ Remplacer par adresse réelle
}
```

### Réseau Flare
- **Testnet**: Configuré par défaut
- **Chain ID**: 114 (Flare Testnet)
- **RPC**: Via viem/chains

## 🛠️ Données d'attestation

### Format de requête
```json
{
  "attestationType": "WEB2JSON_IDENTITY",
  "sourceId": "EDEL_ID",
  "requestBody": {
    "verificationId": "...",
    "verifiedClaims": [...],
    "timestamp": 1234567890,
    "source": "https://verifier.edel-id.ch"
  }
}
```

### Types de claims supportés
- `age_over_18` - Vérification d'âge (18+)
- `given_name` - Prénom
- `family_name` - Nom de famille

## 🎨 Interface utilisateur

### États du loader
- **🔄 Requesting** - Soumission à Flare Network
- **⚡ Validating** - Validateurs en cours de vérification
- **✅ Completed** - Attestation réussie
- **❌ Failed** - Échec du processus

### Fonctionnalités
- Loader animé avec indicateurs de progression
- Affichage de l'ID d'attestation
- Gestion d'erreurs avec retry
- Option de continuer sans attestation

## 🔧 Développement

### Dépendances ajoutées
- `@flarenetwork/flare-periphery-contract-artifacts` - ABIs des contrats Flare
- `viem` - Bibliothèque Ethereum moderne

### Hooks personnalisés
- `useFDCAttestation()` - Gestion complète des attestations
- États: `isLoading`, `attestationId`, `attestationData`, `error`
- Actions: `requestAttestation()`, `reset()`

## 🚀 Prochaines étapes

1. **Configurer les adresses de contrats réelles** sur Flare Network
2. **Obtenir les ABIs exacts** depuis les contrats déployés
3. **Tester sur Flare Testnet** avec de vrais validateurs
4. **Optimiser l'UX** (notifications, états intermédiaires)
5. **Déployer sur Flare Mainnet** pour la production

## 🔗 Ressources

- [Flare Network Documentation](https://docs.flare.network/)
- [FDC Protocol Specification](https://docs.flare.network/tech/data-connector/)
- [Viem Documentation](https://viem.sh/)
- [Edel-ID Verifier API](https://verifier.edel-id.ch/)

---

*Intégration créée pour edelPay - Bridging Web2 Identity to Web3 via Flare Network* 🌉