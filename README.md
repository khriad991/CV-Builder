# CV Builder

## Project Overview

The **CV Builder** is a Next.js-based web application designed to create and export professional CVs. This application allows users to input personal, educational, and professional details and generate a PDF of their CV. The app also supports email functionalities and dynamic data visualization.

### Live Demo

Visit the live version of the application here: [CV Builder](https://cv-builder-assinment.vercel.app/)

### GitHub Repository

Explore the codebase on GitHub: [CV Builder Repository](https://github.com/khriad991/CV-Builder)

## Features

* Generate customizable CVs.
* Export CVs as PDFs.
* Responsive design for better user experience.
* Loading indicators and user feedback with **react-hot-toast**.
* Visual loading animations with **react-loading-skeleton**.

  [//]: # (* Email CV directly via the application.)

## Tech Stack

* **Frontend:** Next.js, TailwindCSS
* **Backend:** Prisma, Next.js API Routes
* **PDF Generation:** with jsPDF
* **Email Service:** emailjs-com, nodemailer
* **Data Management:** SWR, js-cookie
* **Icons and UI Enhancements:** phosphor-react, react-icons, sweetalert2

## Installation and Setup

To get started with the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/khriad991/CV-Builder
   cd CV-Builder
   ```

2. Install dependencies using PNPM:

   ```bash
   pnpm install
   ```

3. Set up the environment variables:

   ```bash
   cp .env.example .env
   ```

4. Run the development server:

   ```bash
   pnpm dev
   ```

5. Open the application in your browser at:

   ```
   ```

[http://localhost:3000](http://localhost:3000)

```

## Building for Production
To build the application for production:
```

pnpm build

```
Start the production server:
```

pnpm start

````

## Prisma Usage
- Run migrations:
  ```bash
  npx prisma migrate dev --name init
````

* Open Prisma Studio:

  ```bash
  npx prisma studio
  ```
* Generate Prisma Client:

  ```bash
  npx prisma generate
  ```

## Contributing

Feel free to submit pull requests to improve the project. Open issues for any bugs or feature requests.

## License

This project is licensed under the MIT License.
