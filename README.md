# 📝 Blog Manager

A simple full-stack **Blog Manager web application** built to practice frontend development, backend APIs, CRUD operations, and frontend-backend integration.

The application allows users to create, view, edit, and delete blog posts through a simple and responsive interface.

---

## 🚀 Features

* ➕ Add new blog posts
* 👀 View all blog posts
* 📖 Read More functionality for long blog content
* ✏️ Edit existing blogs
* 🗑️ Delete blogs
* ⚠️ SweetAlert delete confirmation
* ✅ Form validation
* 🖼️ Blog cover images
* 🔗 Frontend and backend API integration
* 📱 Responsive user interface

---

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript
* Bootstrap

### Backend

* Node.js
* Express.js

### Tools

* Git
* GitHub
* Postman
* SweetAlert2

---

## 📂 Project Structure

```text
Blog-Manager/
│
├── admin/
│
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
│
├── js/
│
├── index.html
├── add-blog.html
├── server.js
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

> The exact structure may vary depending on the current version of the project.

---

## ⚙️ How to Run the Project

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
```

### 2. Open the project folder

```bash
cd Blog-Manager
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the server

```bash
node server.js
```

### 5. Open the application

Open the frontend through your local development setup and make sure the Express server is running.

---

## 🔌 API Endpoints

| Method | Endpoint     | Description       |
| ------ | ------------ | ----------------- |
| GET    | `/blogs`     | Get all blogs     |
| POST   | `/blogs`     | Create a new blog |
| PUT    | `/blogs/:id` | Update a blog     |
| DELETE | `/blogs/:id` | Delete a blog     |

---

## 🔄 CRUD Operations

The project implements the four basic CRUD operations:

### Create

Users can add a new blog with information such as title, author, content, and cover image.

### Read

Users can view all available blogs and use the **Read More** feature for longer content.

### Update

Users can edit existing blog information.

### Delete

Users can delete blogs after confirming the action through **SweetAlert**.

---

## ⚠️ Delete Confirmation

Before deleting a blog, the application displays a confirmation dialog.

```text
Delete Blog?

You won't be able to recover this blog.

Cancel     Yes, Delete It
```

After successful deletion, a success message is displayed.

---

## 🧪 Testing

The main application workflow was tested:

```text
Add Blog
   ↓
View Blog
   ↓
Read More
   ↓
Edit Blog
   ↓
Delete Blog
```

The major features were tested and bugs encountered during development were fixed.

---

## 📚 What I Learned

During this project, I practiced:

* HTML and CSS UI development
* JavaScript form validation
* DOM manipulation
* Express.js
* REST APIs
* GET, POST, PUT, and DELETE requests
* Fetch API
* CRUD operations
* Frontend-backend integration
* Error handling
* Git and GitHub
* Project documentation
* Debugging and testing

---

## 🔮 Future Improvements

Possible improvements for future versions include:

* 🗄️ MySQL or MongoDB database integration
* 🔐 User authentication
* 👤 Admin dashboard
* 🔎 Blog search functionality
* 🏷️ Blog categories
* 📄 Pagination
* ✍️ Rich text editor
* ☁️ Online deployment

---

## 📸 Screenshots

Screenshots of the application can be added here.

Example:

```markdown
![Home Page](screenshots/home.png)

![Add Blog](screenshots/add-blog.png)

![Blog List](screenshots/blog-list.png)
```

---

## 📌 Project Status

**Status: Completed**

The current version includes:

* Frontend UI
* Backend API
* CRUD operations
* Frontend-backend integration
* Form validation
* Blog images
* Read More functionality
* SweetAlert delete confirmation
* Responsive design
* Testing and bug fixing

---

## 👨‍💻 Author

Developed as a learning project to improve full-stack web development skills.

---

## 📄 License

This project is created for educational and learning purposes.
