# Setting Up the `.env` File for PaperLeaf

To set up your environment variables for the PaperLeaf project, follow the steps below. It is critical to use the exact variable names listed here for the application to function correctly.

---

## 1. Get the Neon Postgres Database URL
1. **Create a New Project in Neon:**
   - Go to [Neon](https://neon.tech/) and sign in or create an account.
   - Create a new project and set up a Postgres database.

2. **Retrieve the Database URL:**
   - Once your project is created, navigate to the project dashboard.
   - Copy the **database connection string** (usually starts with `postgres://...`).

3. **Set Environment Variables:**
   - In your `.env` file, set the following variables to the retrieved URL:
     ```plaintext
     NEXT_PUBLIC_DATABASE_URL="<your-neon-database-url>"
     AUTH_DRIZZLE_URL="<your-neon-database-url>"
     ```
   - These variables make the database accessible by both the authentication system and Drizzle ORM.

---

## 2. Generate an Encrypted Key for NextAuth
1. **Generate a Random Encrypted Key:**
   - Use the following command in a terminal to generate a secure key:
     ```bash
     openssl rand -base64 32
     ```

2. **Set Environment Variable:**
   - Copy the generated key and set it as the value for `AUTH_SECRET` in your `.env` file:
     ```plaintext
     AUTH_SECRET="<your-encrypted-key>"
     ```
   - This ensures NextAuth can use the secret to register your authentication flow.

---

## 3. Generate Google Client ID and Secret
To integrate Google authentication, follow the steps outlined in the `docs/oauth.md` file included in the repository.

Set the following environment variables in your `.env` file:
```plaintext
AUTH_GOOGLE_ID="<your-google-client-id>"
AUTH_GOOGLE_SECRET="<your-google-client-secret>"
```

---

## 4. Generate an OpenAI API Key
1. **Create or Sign In to an OpenAI Account:**
   - Go to [OpenAI](https://platform.openai.com/) and log in or create an account.

2. **Generate an API Key:**
   - In your account dashboard, navigate to the API Keys section and create a new key.
   - Copy the key.

3. **Set Environment Variable:**
   - Set the following variable in your `.env` file:
     ```plaintext
     OPENAI_API_KEY="<your-openai-api-key>"
     ```
     
Note: You may need to set up billing and pay to make API calls.

---

## Important Note:
You **must** use the exact variable names listed below in your `.env` file:
- `NEXT_PUBLIC_DATABASE_URL`
- `AUTH_DRIZZLE_URL`
- `AUTH_SECRET`
- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`
- `OPENAI_API_KEY`

Failure to do so will result in the application being unable to authenticate, connect to the database, or access OpenAI's API.
