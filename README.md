# Personal Finance Visualizer

A Next.js app to track and visualize your personal finances.

---

## 📁 Folder Structure

```
src/
  app/
    favicon.ico
    globals.css
    layout.js
    page.js
    analytics/
      page.js
    api/
      transactions/
        route.js
        [id]/
          route.js
    budget/
      page.js
    dashboard/
      page.js
  components/
    BudgetBarChart.jsx
    BudgetManager.jsx
    DashboardSummary.jsx
    ExpenseBarChart.jsx
    ExpensePieChart.jsx
    Home.jsx
    Layout.jsx
    MonthlyBarChart.jsx
    Navbar.jsx
    SpendingInsights.jsx
    TransactionForm.jsx
    TransactionList.jsx
    ui/
      card.jsx
  context/
    TransactionContext.js
  lib/
    db.js
    utils.js
  models/
    transaction.js
```

---

## 🚀 Setup

1. **Clone the repo:**
   ```sh
   git clone <your-repo-url>
   cd personal-finance-visualizer
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛣️ API Routes

### `GET /api/transactions`

- **Description:** Get all transactions (sorted by date descending)
- **Response:**  
  ```json
  [
    {
      "_id": "string",
      "amount": 1200,
      "date": "2024-06-01T00:00:00.000Z",
      "description": "Grocery shopping",
      "category": "Food"
    },
    ...
  ]
  ```

---

### `POST /api/transactions`

- **Description:** Add a new transaction
- **Body:**  
  ```json
  {
    "amount": 1200,
    "date": "2024-06-01",
    "description": "Grocery shopping",
    "category": "Food"
  }
  ```
- **Response:**  
  Returns the created transaction object.

---

### `PUT /api/transactions/[id]`

- **Description:** Update a transaction by ID
- **Body:**  
  ```json
  {
    "amount": 1300,
    "date": "2024-06-02",
    "description": "Supermarket",
    "category": "Food"
  }
  ```
- **Response:**  
  Returns the updated transaction object.

---

### `DELETE /api/transactions/[id]`

- **Description:** Delete a transaction by ID
- **Response:**  
  ```json
  { "message": "Deleted" }
  ```

---

## 🗂️ Main Pages/Routes

- `/`  
  Table view: Filter, edit, and delete transactions in a tabular format.

- `/dashboard`  
  Dashboard: Add/view transactions, see summary cards.

- `/analytics`  
  Analytics: Charts for monthly and category-wise expenses.

- `/budget`  
  Budget: Set budgets, see insights, and compare budget vs. spending.

---

## 📝 Transaction Model

See [`src/models/transaction.js`](src/models/transaction.js):

```js
{
  amount: Number,
  date: Date,
  description: String,
  category: 'Food' | 'Travel' | 'Rent' | 'Shopping' | 'Other'
}
```

---

## 🧑‍💻 Tech Stack

- Next.js (App Router)
- MongoDB (via Mongoose)
- Tailwind CSS
- Recharts (for charts)
- Sonner (for notifications)
- Lucide React (icons)

---

## 📄