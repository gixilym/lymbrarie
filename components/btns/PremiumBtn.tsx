import type { Component } from "@/utils/types";
import { Crown as Icon } from "lucide-react";
import Link from "next/link";

function PremiumBtn(): Component {
  return (
    <Link
      href="/premium"
      title="Premium"
      className="btn btn-square btn-ghost fixed top-3 right-5"
    >
      <Icon size={28} color="#ffda46" />
    </Link>
  );
}

export default PremiumBtn;
