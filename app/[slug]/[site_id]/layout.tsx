import ReadSiteById from "@/utils/actions/sites/read-site-id";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export default async function SiteLayout({
  params,
  children,
}: {
  params: { site_id: string,slug:string};
  children: ReactNode;
}) {

  const result = await ReadSiteById(params?.site_id);

  if (!result) {
    notFound();
  }

  const siteName = result.site_name;
  const siteDomain = result.site_custom_domain;
  const siteDescription = result.site_description;
  const siteLogo = result.site_logo;
  const siteCover = result.site_cover_image;

  return (
    <>
      <head>
        <title>{siteName}</title>
        <meta name="site_name" content={siteName} />
        <meta name="description" content={siteDescription} />
        <meta name="image" content={siteCover} />
        <meta name="url" content={siteDomain + "." + process.env.BASE_DOMAIN}></meta>
        <link rel="icon" href={siteLogo} />
      </head >
      <body>

   
        <main className="flex min-w-screen flex-col items-center justify-between mt-[1rem]">
          {children}
        </main>
      </body>
    </>
  );
}
