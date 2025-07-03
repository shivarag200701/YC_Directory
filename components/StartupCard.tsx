import React from "react";
import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
const StartupCard = ({ post }: { post: StartupCardTypw }) => {
  const { _createdAt, views, title, description, image, author: {name,_id:authorId}, category, _id } =post;
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup-card_date">{formatDate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>
      <div className="flex-between mt-4 gap-5">
        <div className="flex-1">
          <Link href={`/user/${authorId}`}>
          <p className="text-16-medium line-clamp-1">{name}</p></Link>
          <Link href={`/startup/${_id}`}>
          <p className="text-26-semibold line-clamp-1">{title}</p></Link>
        </div>
        <Link href={`/user/${authorId}`}>
          <Image src="https://placehold.co/48x48" alt="placeholder" width={48} height={48} className="rounded-full" />
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>
      <img src={image} alt={title} className="startup-card_img" />

      </Link>
      <div className="flex-between gap-5 mt-4">
        <Link href={`/?query=${category}`}>
        <p className="text-16-medium">{category}</p>
        </Link>
        <Link href={`/startup/${_id}`}>
        <p className="startup-card_btn">Details</p>
        </Link>
      </div>
    </li>
  );
};

export default StartupCard;
