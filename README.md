# PaperLeaf

## Project Contributors and Roles

| **Role**                                   | **Name**            | **GitHub Username**                                         | **Description**                                                                                                                                                                                                                               |
|--------------------------------------------|---------------------|------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Project Manager / Model Development / Fullstack** | Amit Rand           | [randamit123](https://github.com/randamit123)               | Developed single LaTeX character detection CNN model for handwriting-to-LaTeX coupled with image segmentation logic. Attempted entire sequence LaTeX conversion with a data-efficient vision transformer (limited by computing power). Configured authentication with NextAuth, database setup/querying/propagation with Postgres, Drizzle ORM, and Neon. Created and set up application architecture, merged components, managed troubleshooting/error handling, and general project management. Designed and implemented the main image uploading component and most frontend rendering logic with state management. Created main Figma mocks for landing and home pages. |
| **Frontend**                               | Duy-Khang Nguyen    | [dnguyen0425](https://github.com/dnguyen0425)               | Coded the first implementation of the landing page. Implemented frontend for the referrals page, hardcoded the reviews section, and redesigned the dashboard.                                                                                 |
| **Frontend**                               | Lauren Liu          | [lauren123cat](https://github.com/lauren123cat)             | Designed the referral page with Next.js states to manage user inputs, adding an indicator to show referral processing status. Made frontend UI/UX improvements, including dynamic sizing, image formatting, and styling enhancements.            |
| **Frontend**                               | Uma Upasani         | [ba3th0ven](https://github.com/ba3th0ven)              | Implemeneted frontend for the dasboard page with responsive design and styling. Built out drag-and drop functionality for file upload page.        |
| **Frontend**                               | Jack Criminger         | [jcrim828](https://github.com/jcrim828)              | Worked alongside frontend development team. Built out a majority of the landing page, coded original implementations for the login/ signup pages, created web logo, & drafted the original web login/signup mocks. Also developed image formatting and styles for each aforementioned page.       |
| **Backend**                                | Neha Mali           | [neham-04](https://github.com/neham-04)                     | Implemented the database using Neon Postgres and Drizzle ORM (setup and schema). Developed database storage and retrieval functions. Implemented all backend components for the referral system.                                                |

---

## Overview of Application

- **Landing Page:**  
  Users who are not logged in can only access the landing page.

- **Logged-in Users:**  
  - Access to the home page, dashboard, and referral page.
  - **Home Page:** Users can upload images of handwritten proofs.  
    - Uploaded images are previewed before submission.  
    - On submission, the image's metadata is automatically stored in the database alongside its LaTeX translation.  
    - The LaTeX translation is displayed for editing and can be copied into a LaTeX editor.  
  - **Dashboard Page:** Users can view past uploads, metadata, and LaTeX conversions.  
  - **Referral Page:** Users can refer others to use the site or enter referral codes.  

- **Referral-Based LaTeX Conversions:**  
  - Each user gets 10 free LaTeX conversions initially.  
  - Each user must successfully reffer another user to be granted an unlimited amount of LaTeX conversions.  

---

## Setup Before Running the Application

Before running the application, follow the steps in `docs/env.md` and `docs/oauth.md`.  
Failure to complete these steps may result in authentication and database errors.

---

## Getting Started Locally

Note: Be sure to run the frontend and backend in two different terminal shells.

### Clone the Repository
```bash
git clone https://github.com/randamit123/Latex.git
cd Latex
```

### Frontend Setup
1. In the first shell, navigate to the frontend folder:
```bash
cd latexwebapp
```
3. Ensure Node.js is installed (version 20 or higher):
You can use Node Version Manager (nvm) to manage your Node versions.
4. Install dependencies:
```
npm i --legacy-peer-deps
```
Ensure you use the  ```--legacy-peer-deps``` flag.
- After running the above command, you should see:
  - ```package-lock.json```
  - ```node_modules``` folder
4. Start the development server:
```
npm run dev
```
The server will run on ```localhost:3000```.
Open your browser and navigate to ```http://localhost:3000``` to see the landing page.

### Backend Setup
1. In the second terminal, navigate to the backend folder:
```bash
cd server
```
2. Ensure Python 3.10 is installed:
You can check your Python version with:
```bash
python --version
```
3. Create a virtual environment:
```bash
python -m venv venv
```
- This will create a ```venv``` folder.
4. Activate the virtual environment:
```bash
source venv/bin/activate
```
5. Install dependencies:
```bash
pip install -r requirements.txt
```
6. Start the backend server:
```bash
python app.py
```
- The server will run on ```localhost:5001```.


---

### Database Access
The database is hosted on [Neon](https://console.neon.tech).
- Access: You will need to log in to an account that has been registered as a team member.
- Project Dashboard: Once logged in, you can view and manage the database contents.

---

## Tech Stack

- **Frontend:**  
  - Next.js, React, Tailwind CSS  

- **Backend:**  
  - Flask, Python 3.10, Neon Postgres, Drizzle ORM  

- **Machine Learning:**  
  - TensorFlow/Keras for CNN-based model development  
  - Vision Transformer (ViT) integration for sequence-level tasks (in progress)  

- **Authentication:**  
  - NextAuth for secure login  

- **Database:**  
  - Neon Postgres with schema management via Drizzle ORM  

- **DevOps:**  
  - Local development with Node.js and Python virtual environments  

---

## Next Steps

1. **Deployment**  
   - Use **Docker** to containerize both the frontend and backend services.  
   - Use **Kubernetes** for orchestration and scaling.  
   - Deploy the frontend on **Vercel** for fast and reliable hosting easily integratable with Next.js.  
   - Deploy the backend on **AWS Lambda**.  
   - Set up a **CI/CD pipeline** to automate testing, building, and deployment for both services.

2. **Improve the Model**  
   - The current model's weights got messed up and are producing incorrect outputs (gibberish).  
     - This issue isn't critical as per the professor’s feedback since it isn’t graded.  
   - Resolve computational issues to successfully train the Vision Transformer (ViT).  

3. **Refine Segmentation Logic**  
   - The segmentation logic in the backend works well but occasionally includes unintended artifacts.  
   - Improve its precision to eliminate scraps being picked up.

4. **Expand Upload Options**  
   - Extend functionality to support file uploads in addition to image uploads.

5. **Store Images in Database**  
   - Implement functionality to store the images themselves in the database, not just their metadata.

6. **Integrate LLM Helper**  
   - Once the model is functional, integrate a language model (LLM) helper to:  
     - Validate the LaTeX output and flag any nonsensical results.  
     - Prompt users to upload a clearer photo or try again when errors are detected.
