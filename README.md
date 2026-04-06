# Demo Project AI

A full-stack application featuring securely authenticated API services and a modern user interface built from the ground up for seamless usage. 

## 🏗 Architecture
- **Backend**: Spring Boot (Java 17, Spring Security + OAuth2 Resource Server, MapStruct, MySQL, Hibernate)
- **Frontend**: React + Vite (TypeScript, Tailwind CSS, Axios, React Hot Toast)

---

## 🚀 Prerequisites
- **Java 17+**
- **Node.js (v16+)** & **npm**
- **MySQL (v8+)**

---

## 🛠️ Getting Started

### 1. Database Setup
1. Create a local MySQL database named `demo-auth`:
   ```sql
   CREATE DATABASE `demo-auth`;
   ```

### 2. Backend Setup
The backend runs on port `8080` by default.

1. Navigate to the backend directory:
   ```bash
   cd backend/demo-auth
   ```
2. Create/Check your `.env` file containing the environment properties:
   ```env
   SERVER_PORT=8080
   DB_URL=jdbc:mysql://localhost:3306/demo-auth
   DB_USERNAME=root
   DB_PASSWORD=your_password
   # Ensure you provide a strong 256-bit hex/base64 key for JWT signing 
   JWT_SIGNER_KEY=73df47146d3ec8114ddbdfde00e80e4dd65492e5e6756069eb612844c096a50d
   JWT_VALID_DURATION=36000000
   JWT_REFRESHABLE_DURATION=120000000
   FE_URL_LOCAL=http://localhost:5173
   ```
3. Run the Spring Boot application:
   ```bash
   # On Windows
   gradlew.bat bootRun
   
   # On Mac/Linux
   ./gradlew bootRun
   ```

### 3. Frontend Setup
The frontend runs on port `5173` using Vite.

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Create/Check your `.env` file to ensure the base URL for the API is set:
   ```env
   VITE_API_BASE_URL=http://localhost:8080/demo-auth
   ```
3. Install dependencies and start the dev server:
   ```bash
   npm install
   npm run dev
   ```

## 🔐 Security Features incorporated
- **JWT Based Authentication:** Users authenticate once, receiving robust Access and Refresh tokens (via an HttpOnly cookie approach or standardized payload token patterns).
- **No Raw Fetching Standard:** All API invocations pass exclusively through a heavily fortified central `axiosInstance`.
- **Global Error Interception:** Secure central processing ensures sessions are securely wiped & redirected out when 401s occur.

--- 

## 📁 Repository Structure

```text
/
├── .agent/              # Specs and AI/workflow requirements
├── backend/
│   └── demo-auth/       # Spring Boot Application Root 
│       └── src/...
└── frontend/            # React/Vite Application Root
    └── src/
        ├── features/    # Encapsulated component areas (e.g. auth flows)
        ├── interceptors/# Extracted network middleware
        ├── shared/      # Common UI (Inputs, Buttons) and hooks
        └── ...
```
