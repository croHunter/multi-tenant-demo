import { notFound } from "next/navigation";
import React from "react";

const page = ({ params }: { params: { slug: string } }) => {
  const subdomain = params.slug;
  //fetch data using subdomain
  //eg. list of form type supported by this subdomain agency
  if (!subdomain) {
    return notFound();
  }
  return (
    <div>
      <div>Agency site</div>
      <ul>
        <li>i693</li>
        <li>i63</li>
        <li>i69</li>
      </ul>
    </div>
  );
};

export default page;
