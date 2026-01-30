**BudgetPal** is an offline-first mobile budget tracking app built with **React Native (Expo)**.  
It allows users to track income and expenses, view monthly summaries, export data, and persist everything locally without requiring an internet connection.
All data is restored when the app is reopened — no manual save/load logic required.

---
 Features

- ➕ Add income and expense transactions
- 🗑️ Delete transactions with confirmation
- 💾 Persistent local storage (data survives app restarts)
- 🌙 Light / Dark theme toggle (persisted)
- 📊 Monthly spending summary with visual charts
- 📅 Month-by-month transaction filtering
- 📤 Export transactions to CSV
- 📱 Offline-first (no backend required)
---

---
Architecture & State Management

- **Zustand** is used for global state management.
- **zustand/persist** middleware automatically saves and restores state.
- **AsyncStorage** is used as the persistence layer.
- Application state is split into focused stores:
- `useTransactionStore` → handles transactions
- `useThemeStore` → handles theme preferences
---


---
Project Structure
app/
├── index.js # Home screen
├── transactions.js # Transactions list screen
└── _layout.js # Tab navigation layout

components/
├── AddTransaction.js
├── TransactionItem.js
└── SpendingSummary.js

store/
├── useTransactionStore.js
└── useThemeStore.js
---


---
📸 Screenshots


https://github.com/user-attachments/assets/be573ac4-df83-4080-9121-95a55252b6bb



<img src="https://github.com/user-attachments/assets/4937a346-4d08-4f3f-9e9d-c16b71741938" width="300" />
<img src="https://github.com/user-attachments/assets/8b3db04f-7ebd-497e-8f34-a160e1e54b67" width="200" />
<img src="https://github.com/user-attachments/assets/32dd0394-1f0a-4265-a2b9-e1aed1344a17" width="200" />
<img src="https://github.com/user-attachments/assets/451160ad-6f83-4b9b-a81a-ee8fd1db12f3" width="200" />
<img src="https://github.com/user-attachments/assets/2afd6a9c-608e-4cdb-a218-fa23b7e48095" width="200" />

---

 
## Installation

```bash
# Clone the repository
git clone https://github.com/chuks4code/BudgetPal.git
cd BudgetPal

# Install dependencies
npm install

# Start Expo
npx expo start





