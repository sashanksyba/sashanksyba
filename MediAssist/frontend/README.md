# MediAssist Frontend

This is the frontend application for MediAssist, a comprehensive healthcare management system. It's built with React and provides interfaces for both patients and healthcare providers.

## Features

- **User Authentication**: Secure login and registration system with role-based access control
- **Patient Dashboard**: View appointments, medical records, and prescriptions
- **Doctor Dashboard**: Manage patient appointments, schedules, and medical records
- **Appointment Management**: Book, reschedule, and cancel appointments
- **Medical Records**: Access and manage patient medical history
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **React**: Frontend library for building user interfaces
- **React Router**: For navigation and routing
- **React Bootstrap**: UI component library
- **Formik & Yup**: Form handling and validation
- **Axios**: HTTP client for API requests
- **Chart.js & React-Chartjs-2**: Data visualization
- **JWT**: Token-based authentication

## Project Structure

```
frontend/
├── public/                 # Static files
├── src/
│   ├── assets/             # CSS, images, and other static assets
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page components
│   │   ├── patient/        # Patient-specific pages
│   │   └── doctor/         # Doctor-specific pages
│   ├── services/           # API services and utilities
│   ├── App.js              # Main application component
│   └── index.js            # Application entry point
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```
   cd MediAssist/frontend
   ```
3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

### Running the Application

Start the development server:

```
npm start
```

or

```
yarn start
```

The application will be available at http://localhost:3000.

### Building for Production

Create a production build:

```
npm run build
```

or

```
yarn build
```

## Connecting to the Backend

The frontend is configured to connect to the backend API at `http://localhost:8080/api`. If your backend is running on a different URL, update the `API_URL` constant in `src/services/api.service.js` and `src/services/auth.service.js`.

## Authentication

The application uses JWT (JSON Web Tokens) for authentication. When a user logs in, the token is stored in the browser's localStorage and included in the headers of subsequent API requests.

## License

This project is licensed under the MIT License.
