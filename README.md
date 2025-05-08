
![image](https://github.com/user-attachments/assets/461b7f6e-c872-497e-8447-fef8a225d9c9)

# CareProxy - Discover Healthcare Startups

CareProxy is a platform designed to help users explore innovative healthcare startups that are revolutionizing patient care and overall wellbeing. From nutrition and fitness to mental health and medical devices, CareProxy connects you with startups making a difference in the healthcare industry.

## Features

- **Search Startups**: Easily search for startups by name, description, or tags.
- **Category Filter**: Browse startups by categories such as Nutrition, Fitness, Mental Health, and more.
- **Startup Details**: View detailed information about each startup, including their description, founders, website, and LinkedIn profile.
- **Responsive Design**: Enjoy a seamless experience across devices with a modern, responsive interface.

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **Vite**: For fast development and build processes.
- **Tailwind CSS**: For styling and responsive design.
- **Radix UI**: For accessible and customizable UI components.

### Backend
- **Node.js**: For server-side scripting.
- **Express**: For building RESTful APIs.
- **Puppeteer**: For web scraping healthcare startup data.
- **Node-Cron**: For scheduling periodic scraping tasks.

### Database
- **JSON File Storage**: Startups data is stored in a JSON file for simplicity.

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup
1. Navigate to the `backend` directory:
   
   ```bash
   cd backend
   ```
2. Install dependencies:
   
   ```bash
    npm install
    ```
3. Create a `.env` file based on the `.env.example` file and configure your environment variables:
   
   ```bash
   SCRAPE_URL=https://healthstartup.vercel.app/
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   ```
4. Start the backend server:
   
   ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   
   ```bash
   cd frontend
   ```
2. Install dependencies:
   
   ```bash
   npm install
   ```
3. Create a .env file and configure the API base URL:
   
    ```bash
    VITE_API_BASE_URL=http://localhost:5000
    ```
4. Start the frontend development server:
   
    ```bash
    npm run dev
    ```
5. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

1. Open the frontend application in your browser at http://localhost:3000.
2. Use the search bar to find startups or filter by categories.
3. Click on a startup card to view more details.
4. Explore the startup's website and LinkedIn profile for more information.

## API Endpoints

Backend
- **GET** /api/startups: Fetch all startups.
- **GET** /api/categories: Fetch all categories.
- **GET** /api/scrape: Trigger a manual scrape of startup data.

> Made with ❤️ by [Fasakin Henry](https://github.com/fasakinhenry)
