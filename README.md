# Time Tracking App

## Features
- **Time Tracking**: Users can create, start, pause, stop, edit and delete a time stopwatch to track their tasks.
- **Task Description**: Users can add a description to each stopwatch, providing context for their time tracking.
- **Single Active Stopwatch**: Only one stopwatch can be active at a time.
- **Firestore Integration**: The app automatically syncs stopwatch data to Firebase (Firestore), allowing secure data storage and real time data updates.
- **History List**: Users can view a list of all their tracked and saved times for reference.

## Tech Stack
- **Next.js**: The app is built using Next.js.
- **Firebase**: Firebase is used for data storage and authentication.
- **Primefaces UI**: Primefaces UI components are used in the project.
- **Formik/Yup**: Formik and yup are used for all the forms and their validation.
- **dayjs**: Dayjs is used for easier manipulation of Date objects.

## Getting Started
To set up and run the app on your local environment, follow these steps:

1. Clone the repository to your local environment.
2. Install the required dependencies by running `npm install`.
3. Configure your Firebase credentials and connection details in the `.env.local` file, following the `.env.example` file located in the root of the project. **Note: Be cautious with your credentials and do not share sensitive information.**
4. Start the development server with `npm run dev`.
