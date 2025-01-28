# Telegram Forum

A modern web application for discovering and sharing Telegram channels and groups. Built with Next.js 14, Supabase, and TypeScript.

![Telegram Forum](https://sjc.microlink.io/Ci3E75XGfuEHTpVmSB188jm6eg7vzOS-shvIJos65EJpcOuU1Fnr7NIroOWiW59zi_ZD3ZLCyXLGMGCHJcGjcQ.jpeg)

## Features

- 🚀 **Modern Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS
- 🔐 **Authentication**: Secure user authentication with Supabase Auth
- 📊 **Real-time Database**: Powered by Supabase for real-time updates
- 📱 **Responsive Design**: Mobile-first approach for all screen sizes
- 🎯 **SEO Optimized**: Built-in SEO components for better visibility
- 📈 **Analytics**: Integrated Google Analytics for tracking user behavior

### Key Functionalities

- User authentication (sign up, sign in, profile management)
- Post and discover Telegram channels/groups
- Comment system
- Rating system
- Bookmarking feature
- Tag-based categorization
- Search functionality
- Real-time updates

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Google Analytics account (optional)

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_measurement_id
```

### Installation

1. Clone the repository:


```shellscript
git clone https://github.com/saikothasan/teletop.git
cd teletop
```

2. Install dependencies:


```shellscript
npm install
# or
yarn install
```

3. Run the development server:


```shellscript
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.


### Database Setup

1. Create a new Supabase project
2. Run the migration scripts found in `supabase/migrations/`
3. Update your environment variables with the Supabase credentials


## Project Structure

```plaintext
teletop/
├── app/                   # Next.js 14 app directory
├── components/           # Reusable React components
├── contexts/            # React context providers
├── hooks/              # Custom React hooks
├── lib/               # Utility functions and configurations
├── public/           # Static assets
└── types/           # TypeScript type definitions
```

## Features in Detail

### Authentication

- Email/password authentication
- Protected routes
- User profile management


### Content Management

- Create, read, update, and delete Telegram entries
- Rich text editor for descriptions
- Image upload support
- Tag management


### Interaction Features

- Comment system
- Rating system (1-5 stars)
- Bookmark functionality
- Real-time updates


### Search and Discovery

- Full-text search
- Tag-based filtering
- Sort by various criteria (newest, popular, highest rated)
- Pagination support


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Saikot Hasan - [@saikothasan](https://github.com/saikothasan)

Project Link: [https://github.com/saikothasan/teletop](https://github.com/saikothasan/teletop)

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
