# Architecture Overview - Wallet & Credits Feature

This document breaks down the Repository-Service-Hook-View setup I built for the wallet feature. My goal with this architecture was to keep UI components simple, business rules centralized, and data operations easy to swap out down the road.

---

## 1. Repository: `transactionRepo.ts`

### What does it do?
It handles basic CRUD operations for transaction data. Right now, it works with mock in-memory data (pre-loaded with sample transactions), providing functions to read and add transaction records.

### Logic decisions & Separation of Concerns
I included zero business logic or React state in the repository. Its only job is to communicate with the data source. Isolating this layer ensures that when I switch from test data to an actual backend API or database in the next sprint, I only have to update this file without breaking the rest of the app.

### Where and how it's used
It is imported and called directly inside `walletService.ts` whenever transaction data needs to be fetched or updated.

---

## 2. Service: `walletService.ts`

### What does it do?
It holds all the business logic and rules for managing wallet credits. It validates deposit and withdrawal attempts (e.g., checking for negative amounts or insufficient funds) before making changes.

### Logic decisions & Separation of Concerns
By keeping validation math out of React components and hooks, I ensured business rules live in one central place. If minimum/maximum deposit limits change later, I only need to update this service instead of hunting through UI components.

### Where and how it's used
It is used inside the `useWallet` custom hook. The hook passes raw user inputs to `walletService`, which processes the rules and calls `transactionRepo` to save the results.

---

## 3. Hook: `useWallet.ts`

### What does it do?
It's a custom React hook that manages reactive state for the user's available credits, transaction list, and inline error messages. It exposes clean helper functions like `deposit()`, `withdraw()`, and `removeTransaction()`.

### Logic decisions & Separation of Concerns
This hook handles presentation logic and React state updates, but delegates all heavy validation to `walletService`. This separates state management from business rules and keeps UI components declarative.

### Where and how it's used
It is invoked in `App.tsx` to initialize lifted global state, allowing the `Layout` navbar and `UserProfile` page to share live balance updates seamlessly.