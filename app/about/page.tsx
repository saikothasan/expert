import SEO from "../../components/SEO"

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn more about Telegram Forum and our mission to connect Telegram users"
        keywords="about, telegram forum, mission, community"
      />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">About Telegram Forum</h1>
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <p className="text-gray-700 mb-4">
              Telegram Forum is a community-driven platform dedicated to helping users discover and share the best
              Telegram channels and groups. Our mission is to create a centralized hub where Telegram enthusiasts can
              connect, explore, and engage with high-quality content across various interests and topics.
            </p>
            <p className="text-gray-700 mb-4">
              Founded in 2023, we've grown into a vibrant community of Telegram users who are passionate about sharing
              knowledge, fostering discussions, and building connections. Whether you're looking for educational
              resources, entertainment, or niche communities, Telegram Forum is your gateway to the vast world of
              Telegram.
            </p>
            <p className="text-gray-700 mb-4">
              Our platform features a user-friendly interface that allows members to easily post, discover, and interact
              with Telegram channels and groups. With our rating and comment system, you can quickly identify the most
              valuable and relevant content for your interests.
            </p>
            <p className="text-gray-700">
              Join us in our mission to make the Telegram ecosystem more accessible and enjoyable for everyone. Whether
              you're a longtime Telegram user or just getting started, Telegram Forum is here to enhance your experience
              and help you make the most of this powerful messaging platform.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

