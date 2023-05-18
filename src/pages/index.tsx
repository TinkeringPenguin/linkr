import { type NextPage } from "next";
import Link from "next/link";
import Head from "~/components/SEO/Head";
import Title from "~/components/SEO/Title";
import links from '~/data/links.json';
import { z } from "zod";
import React, { useState } from "react";

// icons
import { FaYoutube, FaDiscord, FaTwitter, FaGithub, FaHandsHelping, FaBookOpen } from 'react-icons/fa';

interface LinkComponentInterface {
  link: string,
  header: string,
  Icon: React.ReactNode
}

const LinkComponent: React.FC<LinkComponentInterface> = ({link, header, Icon}) => {
  return (
    <Link
      className="flex justify-between drop-shadow-2xl items-center gap-4 rounded-xl bg-white/90 p-4 text-slate-900/90 hover:bg-white/50 transition"
        href={link}
        target="_blank"
      >
        {Icon}
      <p className="text-2xl font-bold text-center">{header}</p>
      <span />
      {/* <span className="font-bold text-2xl">→</span> */}
    </Link>
  )
}

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
        style={userData.background_image ? {backgroundImage: `url(${userData.background_image})`} : {}}
        >
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 pb-40">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              {userData.name} <span className="text-fuchsia-500">Links</span>
            </h1>
            <h2 className="text-white/95 font-bold text-xl mt-4"><a href="#">@{userData.handle}</a></h2>
          </div>
          <div className="grid gap-4 md:gap-4 min-w-[320px] sm:min-w-[350px]">
            {(userData.links.youtube_link && userData.links.youtube_heading) ? <LinkComponent link={userData.links.youtube_link} header={userData.links.youtube_heading} Icon={<FaYoutube size={24}/>} /> : null}
            {(userData.links.github_link && userData.links.github_heading) ? <LinkComponent link={userData.links.github_link} header={userData.links.github_heading} Icon={<FaGithub size={24}/>} /> : null}
            {(userData.links.twitter_link && userData.links.twitter_heading) ? <LinkComponent link={userData.links.twitter_link} header={userData.links.twitter_heading} Icon={<FaTwitter size={24}/>} /> : null}
            {(userData.links.website_link && userData.links.website_heading) ? <LinkComponent link={userData.links.website_link} header={userData.links.website_heading} Icon={<FaBookOpen size={24}/>} /> : null}
            {(userData.links.company_link && userData.links.company_name) ? <LinkComponent link={userData.links.company_link} header={userData.links.company_name} Icon={<FaHandsHelping size={24}/>} /> : null}
            {(userData.links.discord_handle) ? <LinkComponent link={userData.links.discord_handle} header={"Discord"} Icon={<FaDiscord size={24}/>} /> : null}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
