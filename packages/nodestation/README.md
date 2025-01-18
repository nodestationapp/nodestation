# Nodestation

Nodestation is a powerful framework for building backend applications with ease. With automated configuration and a streamlined setup process, you can get your app up and running in no time. Perfect for developers looking to save time and focus on creating great features.

## Installation

Follow these steps to install and set up Nodestation in your project:

**🚀 Quick start (Recommended)**

```bash
npx create-nodestation-app app-name
```

--- OR ---

**1. Install Nodestation**

Add Nodestation to your project by running:

```bash
npm install nodestation
```

**2. Set up your environment variables**  
Create a `.env` file in the root of your project and define the following variables:

```
PORT=3000
TOKEN_SECRET=your_secret_key
DATABASE_URL=your_database_connection_url
```

**3. Update your package.json scripts**  
Add the following script to the scripts section of your package.json:

```
"start": "nodestation start"
```

## Usage

To start the application, run:

```bash
npm start
```
