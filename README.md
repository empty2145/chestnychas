# chestnychas
// notice
⏱️ Честный час (Honest Hour) Tracker

A custom logging and visualization system designed to track deep work, study duration, and focus levels directly from Obsidian. Inspired by Daniel Barada's "Честный час" methodology, this tool bridges personal knowledge management with a dedicated cloud database to maintain strict accountability over academic and project work.
🏗️ Architecture & Tech Stack

    Frontend / Client: Obsidian (via the Templater plugin)

    Backend API: Node.js & Express.js

    Database: MongoDB Atlas (Mongoose ODM)

    Deployment: Vercel (Serverless Functions)

✨ Features

    Frictionless Logging: Trigger a prompt directly inside any Obsidian note to log the subject, focus rating (1-5), and qualitative notes.

    Strict Validation: Mongoose schemas ensure only valid subjects (e.g., Calculus, Physics, Computer Science) and correct data types are accepted.

    Automated Dashboards: Dynamically fetch and render Markdown tables in your daily notes showing aggregated statistics like total hours and average focus per subject.

    Cloud-Native: Fully decoupled backend hosted on Vercel, ensuring 24/7 uptime and bypassing local network restrictions (like strict university firewalls).

🚀 Setup & Installation
1. Backend Deployment (Vercel & MongoDB)

    Clone this repository and push it to your own GitHub account.

    Create a new cluster in MongoDB Atlas.

    Under Network Access, whitelist 0.0.0.0/0 to allow Vercel's dynamic serverless IP addresses to connect.

    Import your repository into Vercel.

    In Vercel's deployment settings, add an Environment Variable named MONGODB_URI containing your Atlas connection string.

    Deploy the project and copy your live Vercel domain.

2. Obsidian Configuration

This system requires the Templater plugin for Obsidian.

    Ensure Templater is installed and User System Command Execution is enabled.

    In your vault's designated Scripts folder, create two JavaScript files:

        logSession.js: Handles the POST request to /api/sessions.

        getStats.js: Handles the GET request to /api/stats and formats the Markdown table.

    Update the fetch() URLs in both scripts to point to your live Vercel domain.

    Create your Markdown templates (e.g., Trigger Honest Hour.md and Insert Stats.md) in your Templates folder to call these scripts.

📡 API Endpoints
POST /api/sessions

Logs a new honest hour session.

    Body: { "subject": "Physics", "durationMinutes": 60, "focusRating": 4, "notes": "Kinematics practice" }

    Response: 201 Created

GET /api/stats

Aggregates all sessions and returns summary statistics per subject.

    Response: 200 OK (Array of objects containing subject, totalHours, and averageFocus).

If you ever want to expand the schema to track things like specific assignment types or sync it with your daily schedule, you can just update the Mongoose model in the repository and let Vercel handle the automatic redeployment.