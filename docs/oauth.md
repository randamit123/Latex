# Setting Up Google OAuth for NextAuth

Follow these steps to generate a Google Client ID and Secret Key using the Google Developer Console:

## Step 1: Access Google Developer Console
1. Open your browser and navigate to the [Google Developer Console](https://console.developers.google.com/).
2. Log in with your Google account credentials.

## Step 2: Create a New Project
1. Click on the dropdown menu in the top navigation bar and select **New Project**.
2. Enter a **Project Name** and optionally, specify an organization and location.
3. Click **Create** and wait for the project to be set up.

## Step 3: Enable the Google OAuth API
1. Inside your project dashboard, click on **Library** in the left-hand menu.
2. Search for **"Google Identity Services"** or **"OAuth 2.0"** in the search bar.
3. Click on the result and then click **Enable**.

## Step 4: Configure OAuth Consent Screen
1. In the left-hand menu, click on **OAuth consent screen**.
2. Select the **User Type**:
   - For personal projects, choose **External**.
   - For internal projects within an organization, choose **Internal**.
3. Fill out the required fields:
   - **App Name**
   - **User Support Email**
   - **Developer Contact Information**
4. Optionally, customize the branding and authorized domains.
5. Click **Save and Continue**.

## Step 5: Create OAuth Credentials
1. In the left-hand menu, go to **Credentials**.
2. Click **Create Credentials** > **OAuth 2.0 Client ID**.
3. Select **Web Application** as the application type.
4. Fill out the form:
   - **Name**: Provide a name for your client ID (e.g., "PaperLeaf").
   - **Authorized Redirect URIs**: Add `http://localhost:3000/api/auth/callback/google` for local development. 
5. Click **Create**.

## Step 6: Retrieve Your Client ID and Secret
1. After creating the credentials, you will see your **Client ID** and **Client Secret**.
2. Copy and save these securely. You will use them in your `.env` file.

## Step 7: Add Credentials to Your `.env` File
In your Next.js project, update your `.env` file by setting the following variables equal to your **Client ID** and **Client Secret** respectively:
```plaintext
AUTH_GOOGLE_ID="<your-google-client-id>"
AUTH_GOOGLE_SECRET="<your-google-client-secret>"
```
**Note:** It is of extreme importance that you use the exact variable names listed when configuring your `.env`. 