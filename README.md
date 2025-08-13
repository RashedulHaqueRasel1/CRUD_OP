# 🛍️ CRUD Operation Project

A simple **Next.js** application demonstrating **full CRUD functionality** (Create, Read, Update, Delete) along with a local cart system using **localStorage**.  
Users can:

- Add products (name, description, price, image upload)
- View all products
- Edit product details
- Delete products
- Add products to a shopping cart (data stored in `localStorage`)

Backend API handles all CRUD operations except the cart, which works from local storage.

---

## 🚀 Live Demo
🔗 [Live Website](https://crud-op-omega.vercel.app/)

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (TypeScript)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Data Fetching & Mutations:** [TanStack Query](https://tanstack.com/query)
- **Image Handling:** Next.js Image & API
- **State & Storage:** LocalStorage (for cart)
- **Deployment:** [Vercel](https://vercel.com/)

---

## ✨ Features

- ➕ **Add Product** — with image upload
- 📜 **View All Products** — fetched from backend API
- ✏️ **Edit Product** — update name, description, price, and image
- ❌ **Delete Product** — remove from backend database
- 🛒 **Add to Cart** — stored in `localStorage` for persistence
- ⚡ **Fast & Optimized** — powered by TanStack Query caching

---

## ⚙️ Installation & Local Setup

Follow these steps to run the project locally:
### 1️⃣ Clone the Repository
 
- git clone https://github.com/RashedulHaqueRasel1/CRUD_OP.git

- cd CRUD_OP

2️⃣ Install Dependencies

- npm install

3️⃣ Set Up Environment Variables

- NEXT_PUBLIC_API_BASE_URL=your_backend_api_url

4️⃣ Run the Development Server

- npm run dev

## The app will be available at:
👉 http://localhost:3000