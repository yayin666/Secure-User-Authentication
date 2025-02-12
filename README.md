# Secure-User-Authentication
login web page with secure user authentication
steps to access and work out this

---

## **Prerequisites:**
1. **Node.js and npm** - Make sure you have Node.js and npm installed on your system.
   - [Download Node.js](https://nodejs.org/)
   - Verify installation by running:
     ```bash
     node -v
     npm -v
     ```

2. **Visual Studio Code** - Install VS Code if not already installed.
   - [Download VS Code](https://code.visualstudio.com/)

---

## **Installation Steps:**
1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd secure-login-dashboard
   ```

2. **Open the Project in VS Code:**
   ```bash
   code .
   ```

3. **Install Dependencies:**
   - Open a terminal in VS Code and run:
     ```bash
     npm install
     ```
   This will install the required packages mentioned in `package.json`.

---

## **Configuration:**
1. **Check Folder Structure:**
   ```
   secure-login-dashboard/
   │   app.js               // Node.js server code
   │   package.json         // Dependencies and scripts
   └───public/
       │   login.html       // Login page
       │   register.html    // Registration page
       │   dashboard.html   // Dashboard page
       │   style.css        // CSS for styling
       │   script.js        // JavaScript for client-side functionality
   ```

2. **Create Data Storage:**
   - If not present, create a file named `users.json` in the root folder:
     ```
     secure-login-dashboard/
     │   users.json         // Stores registered users' data
     ```

   - Initialize the file with an empty array:
     ```json
     []
     ```

---

## **Running the Project:**
1. **Start the Server:**
   ```bash
   node app.js
   ```
   The server will start at `http://localhost:3000`.

2. **Open the Application:**
   - Visit [http://localhost:3000](http://localhost:3000) in your browser.
   - You will be redirected to the **registration page**.

---

## **Features:**
- Secure **Registration** with password reconfirmation.
- **Login** with session management.
- **Role-Based Access Control** for dashboard and admin areas.
- **Password Hashing** with bcrypt for secure storage.

---

## **Usage:**
1. **Register:** 
   - Enter a username and password twice to confirm.
   - If passwords do not match, an alert will prompt you to try again.

2. **Login:**
   - Use the registered credentials.
   - Access the **Dashboard** if authentication is successful.

3. **Logout:**
   - Click on **Logout** in the dashboard to end the session.

---

## **Scripts:**
- **Start Server:** `node app.js`
- **Install Dependencies:** `npm install`

---

## **Dependencies:**
- **express**: Fast, unopinionated, minimalist web framework for Node.js.
- **express-session**: Session middleware for Express.
- **bcrypt**: For secure password hashing.
- **body-parser**: Parses incoming request bodies.
- **path**: For handling and transforming file paths.
- **fs**: File system module to read/write user data.

---

## **Security Features:**
- **Password Hashing**: Using `bcrypt` with a salt round of 12 for strong encryption.
- **Session Management**:
  - `HTTPOnly` cookies for session security.
  - Session timeout after inactivity.
- Role-Based Access Control: Restricts access to admin routes.


## Notes:
- Change the session `secret` in `app.js` before deploying to production.
- Set `cookie: { secure: true }` when using HTTPS in production.
