This project is a fork of sadmann7's file-uploader https://github.com/sadmann7/file-uploader and it uses S3 instead of uploadthing.

🚨🚨🚨 This is a work in progress and is not yet ready for production. I will add more features and fix the bugs as I go along. It now stores the uploaded image keys in local storage so that it can be used in the image generation process, but I will be adding a database soon.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com)
- **DND Uploader:** [react-dropzone](https://react-dropzone.js.org/)
- **Storage:** [AWS S3](https://aws.amazon.com/s3/)
- **Validation:** [Zod](https://zod.dev)
- **ORM:** [Drizzle](https://drizzle.dev)
- **Database:** [PostgreSQL](https://www.postgresql.org)
- **Google OAuth:** [NextAuth](https://next-auth.js.org)

## Features
- [x] Drag and drop file upload component with progress bar
- [x] File dialog demo with adding and removing files from the scrollable list

## Running Locally


- Copy the `.env.example` to `.env` and update the variables.

   ```bash
   cp .env.example .env
   ```

- Setup local postgres db and update .env with your credentials, apply migrations and make sure your DB is running (I just use postgres app on mac)
- Setup AWS S3 bucket and update .env with your credentials
- Setup Google OAuth and update .env with your credentials

- Install dependencies using pnpm

   ```bash
   npm install
   ```

- Start the development server

   ```bash
   npm run dev
   ```

