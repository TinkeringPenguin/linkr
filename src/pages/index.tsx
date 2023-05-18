import { type NextPage } from "next";
import Link from "next/link";
import Head from "~/components/SEO/Head";
import Title from "~/components/SEO/Title";
import links from '~/data/links.json';
import { z } from "zod";
import { useState } from "react";

const Home: NextPage = () => {
  // zod verify
  const linkSchema = z.object({
    name: z.string(),
    handle: z.string(),
    background_image: z.string().optional(),
    links: z.object({
      icon: z.boolean().default(true),
      youtube_link: z.string().url().optional(),
      youtube_heading: z.string().optional(),
      twitter_link: z.string().url().optional(),
      twitter_heading: z.string().optional(),
      github_link: z.string().url().optional(),
      github_heading: z.string().optional(),
      website_link: z.string().url().optional(),
      website_heading: z.string().optional(),
      company_link: z.string().url().optional(),
      company_name: z.string().optional(),
      discord_handle: z.string().optional(),
    })
  })

  const [userData, _] = useState(linkSchema.parse(links));

  // TODO: copy link on click handle

  return (
    <>
      <Head />
      <Title title={`${userData.name} Links`}/> 
    <main className={`flex min-h-screen flex-col items-center justify-center bg-indigo-700 bg-cover bg-center`}
        style={{backgroundImage: `url(${userData.background_image})`}}
        >
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 pb-40">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
              {userData.name} <span className="text-[hsl(280,85%,62%)]">Links</span>
            </h1>
            <h2 className="text-white/95 font-bold text-xl mt-4"><a href="#">@{userData.handle}</a></h2>
          </div>
          <div className="grid gap-4 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/70 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/70 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
