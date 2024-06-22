import { notFound } from "next/navigation";
import React from "react";

const page = ({ params }: { params: { slug: string; site_id: string } }) => {
  const subdomain = params.slug;
  const siteId = params.site_id;
  console.log({ subdomain, siteId });
  if (!subdomain || !siteId) {
    return notFound();
  }
  return (
    <div>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam non
      voluptates sunt maiores sapiente qui quis error odit tenetur eveniet,
      itaque voluptas in rem placeat eum fugiat, vel consectetur quisquam!
    </div>
  );
};

export default page;
