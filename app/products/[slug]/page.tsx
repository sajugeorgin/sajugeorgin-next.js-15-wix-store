"use client";

import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams<{ slug: string }>();

  return <p>{params.slug}</p>;
}
