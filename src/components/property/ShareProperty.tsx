"use client";

import { useState } from "react";
import { Share2, Link2, Check, MessageCircle, Mail, Twitter } from "lucide-react";

interface SharePropertyProps {
  title: string;
  slug: string;
}

export function ShareProperty({ title, slug }: SharePropertyProps) {
  const [copied, setCopied] = useState(false);
  const url = `https://3guae.com/property/${slug}`;
  const text = `Check out ${title} on 3G Real Estate`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareLinks = [
    {
      label: "WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
      color: "bg-green-600 hover:bg-green-700 text-white",
    },
    {
      label: "Email",
      icon: Mail,
      href: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`,
      color: "bg-navy-800 hover:bg-navy-700 text-white",
    },
    {
      label: "Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      color: "bg-sky-500 hover:bg-sky-600 text-white",
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-400 mr-1">Share:</span>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
          copied
            ? "bg-green-100 text-green-600"
            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
        }`}
        title="Copy link"
      >
        {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
      </button>

      {/* Share buttons */}
      {shareLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${link.color}`}
          title={`Share on ${link.label}`}
        >
          <link.icon className="w-3.5 h-3.5" />
        </a>
      ))}
    </div>
  );
}
