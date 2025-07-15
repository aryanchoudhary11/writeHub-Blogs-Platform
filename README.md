# 📝 WriteHub — A Modern Blogging Platform

**WriteHub** is a sleek, full-featured blog application where users can create, edit, and publish blog posts with featured images, a rich text editor, authentication, and dynamic content rendering. It offers a smooth and responsive UI with full CRUD functionality and user-based access control.

---

## 🚀 Features

- 🔐 **User Authentication** (Sign Up, Login, Logout)
- 📄 **Create / Edit / Delete Posts**
- 🖼️ **Featured Image Upload & Preview**
- ✍️ **Rich Text Editor** (powered by TinyMCE)
- 👤 **My Posts Dashboard**
- 🔍 **View All Published Posts**
- 🎨 **Clean & Responsive UI**
- ⚡ **Appwrite Backend Integration**

---

## 🧱 Tech Stack

| Frontend         | Backend Services     | Libraries & Tools        |
|------------------|----------------------|---------------------------|
| React            | Appwrite (Auth, DB, Storage) | React Router DOM        |
| Tailwind CSS     |                      | Redux Toolkit (Auth)     |
| React Hook Form  |                      | TinyMCE Editor (RTE)     |

---


## 🛠️ Setup Instructions

### 📦 Clone the Repo

```bash
git clone https://github.com/your-username/writehub.git
cd writehub
```

📦 Install Dependencies
```bash
npm install
```

⚙️ Configure Environment Variables
Create a .env file in the root:

```bash
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
```

🧪 Demo
✅ Hosted on Netlify
🔗 https://writehub-by-aryan-choudhary.netlify.app

