"use client";

import React, { useState } from "react";
import Header from "@/app/header/page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  Twitter,
  Copy,
  CheckCircle,
} from "lucide-react";

export default function LeaderboardSidebar() {
  const [referralLink, setReferralLink] = useState(
    "https://Superapp.gg/referr=OF61A"
  );
  const [copied, setCopied] = useState(false);

  // Top 3 users data
  const topThree = [
    {
      name: "Sam",
      tokens: 9300,
      avatar: "/avatars/avatar4.svg",
      rank: 1,
      position: "center",
    },
    {
      name: "Ninja",
      tokens: 8900,
      avatar: "/avatars/avatar5.svg",
      rank: 2,
      position: "left",
    },
    {
      name: "Thug",
      tokens: 7010,
      avatar: "/avatars/avatar6.svg",
      rank: 3,
      position: "right",
    },
  ];

  // Right side rows (mock)
  type Row = {
    name: string;
    handle: string;
    refs: number;
    tokens: number;
    avatar: string;
    you?: boolean;
    highlight?: "purple" | "grey" | "orange";
  };

  const rows: Row[] = [
    { name: "Mike", handle: "03D__153d143", refs: 12, tokens: 8900, you: true, avatar: "/avatars/avatar1.svg" },
    { name: "Sam", handle: "03D__153d143", refs: 15, tokens: 9300, highlight: "purple", avatar: "/avatars/avatar2.svg" },
    { name: "Ninja", handle: "03D__153d143", refs: 12, tokens: 8900, highlight: "grey", avatar: "/avatars/avatar3.svg" },
    { name: "Thug", handle: "03D__153d143", refs: 12, tokens: 7010, highlight: "orange", avatar: "/avatars/avatar4.svg" },
    { name: "Thor", handle: "03D__153d143", refs: 7, tokens: 6555, avatar: "/avatars/avatar5.svg" },
    { name: "Loki", handle: "03D__153d143", refs: 5, tokens: 5400, avatar: "/avatars/avatar6.svg" },
    { name: "Hulk", handle: "03D__153d143", refs: 3, tokens: 3200, avatar: "/avatars/avatar1.svg" },
    { name: "Deadpool", handle: "03D__153d143", refs: 3, tokens: 3200, avatar: "/avatars/avatar2.svg" },
    { name: "Spider-Man", handle: "03D__153d143", refs: 2, tokens: 2800, avatar: "/avatars/avatar3.svg" },
    { name: "Iron Man", handle: "03D__153d143", refs: 2, tokens: 2500, avatar: "/avatars/avatar4.svg" },
    { name: "Captain", handle: "03D__153d143", refs: 1, tokens: 2100, avatar: "/avatars/avatar5.svg" },
    { name: "Wolverine", handle: "03D__153d143", refs: 1, tokens: 1900, avatar: "/avatars/avatar6.svg" },
    { name: "Storm", handle: "03D__153d143", refs: 1, tokens: 1700, avatar: "/avatars/avatar1.svg" },
    { name: "Cyclops", handle: "03D__153d143", refs: 0, tokens: 1500, avatar: "/avatars/avatar2.svg" },
  ];

  const getRowBg = (r: { highlight?: "purple" | "grey" | "orange" }) => {
    if (r.highlight === "purple") return "bg-purple-100";
    if (r.highlight === "grey") return "bg-gray-100";
    if (r.highlight === "orange") return "bg-orange-100";
    return "bg-slate-50";
  };

  const getPodiumColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-b from-purple-200 to-purple-300";
      case 2:
        return "bg-gradient-to-b from-gray-200 to-gray-300";
      case 3:
        return "bg-gradient-to-b from-orange-200 to-orange-300";
      default:
        return "bg-gray-200";
    }
  };

  const getPodiumHeight = (rank: number) => {
    switch (rank) {
      case 1:
        return "h-16";
      case 2:
        return "h-12";
      case 3:
        return "h-10";
      default:
        return "h-8";
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-500 text-white border-yellow-600";
      case 2:
        return "bg-gray-500 text-white border-gray-600";
      case 3:
        return "bg-orange-500 text-white border-orange-600";
      default:
        return "bg-gray-400 text-white";
    }
  };

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // Arrange podium positions
  const arrangedUsers = [
    topThree.find((user) => user.rank === 1),
    topThree.find((user) => user.rank === 2),
    topThree.find((user) => user.rank === 3),
  ].filter(Boolean) as typeof topThree;

  return (
    <>
<div         
  className="absolute inset-0 bg-no-repeat bg-center bg-contain"         
  style={{               
    backgroundImage: "url('/images/globe.svg')",
    backgroundPosition: 'center 20%',
    backgroundSize: '1100px 1100px',
    filter: 'grayscale(100%) brightness(0.9) opacity(0.08)',
    zIndex: -1
  }}   
/>
    <div className="relative min-h-screen ">
      <Header />

      


      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 md:px-8 z-10">
        <h1 className="text-4xl md:text-5xl font-semibold text-[#060535] mb-4 leading-snug font-inter tracking-tighter whitespace-nowrap text-center">
          Superapp Leaderboard
        </h1>
    {/* Two-column layout */}
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* Left column */}
      <div className="md:col-span-4 space-y-3">
        {/* Podium + Referral */}
        <div className="w-full bg-white rounded-xl shadow-sm p-3">
          <div className="space-y-2">
            <div className="flex justify-center items-end space-x-3">
              {arrangedUsers.map((user) => (
                <div key={user.rank} className="flex flex-col items-center">
                  <div className="relative mb-2">
                <Avatar
                  className={`${user.rank === 1 ? "h-16 w-16" : "h-14 w-14"} border-2 ${
                    user.rank === 1
                      ? "border-yellow-400"
                      : user.rank === 2
                      ? "border-gray-400"
                      : "border-orange-400"
                  } shadow-lg`}
                >
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div
                  className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold border border-white ${getRankBadgeColor(
                    user.rank
                  )} shadow-md`}
                >
                  {user.rank}
                </div>
              </div>
              <span className="text-xs font-semibold text-gray-800 mb-1">
                {user.name}
              </span>
              <div
                className={`w-12 ${getPodiumHeight(user.rank)} ${getPodiumColor(
                  user.rank
                )} rounded-t-lg flex flex-col items-center justify-between py-1 shadow-sm`}
              >
                <div className="flex-1 flex items-center">
                  {user.rank === 1 && (
                    <Image
                      src="/icons/trophy.svg"
                      width={12}
                      height={12}
                      alt="trophy logo"
                      className="w-3 h-3 text-yellow-600"
                    />
                  )}
                </div>
                <span className="text-[10px] font-bold text-gray-700">
                  {user.rank === 1
                    ? "1st"
                    : user.rank === 2
                    ? "2nd"
                    : "3rd"}
                </span>
              </div>
              <div className="mt-1 text-[10px] font-medium text-gray-600">
                {user.tokens.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

              <div className="w-full h-0.5 relative mt-3 md-3">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full"></div>
              </div>

              {/* Referral Section */}
              <div className="space-y-3 pt-2">
                <div className="relative">
                  <div
                    className="absolute left-2 top-4 w-0.5 bg-purple-300"
                    style={{ height: "calc(100% - 2rem)" }}
                  ></div>

                  <div className="relative flex items-start space-x-2">
                    <div className="w-4 h-4 bg-purple-500 rounded-full flex-shrink-0 flex items-center justify-center z-10">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                    <div className="flex-1 pb-4">
                      <h3 className="text-sm font-bold text-purple-600 mb-1">
                        SHARE REFERRAL LINK
                      </h3>
                      <p className="text-gray-600 text-[10px] leading-relaxed">
                        Invite Friends & Families to join Superapp.
                        <br />
                        Share Your Link Today!
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-start space-x-2">
                    <div className="w-4 h-4 bg-purple-500 rounded-full flex-shrink-0 flex items-center justify-center z-10">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-purple-600 mb-1">
                        EARN REWARD
                      </h3>
                      <p className="text-gray-600 text-[10px]">
                        Boost your benefits with Superapp.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 pt-1.5 pb-2.5 ">
                  <div className="relative">
                    <Input
                      value={referralLink}
                      readOnly
                      className="text-[7px] bg-white border border-gray-300 rounded-lg pr-20 py-1 h-8"
                    />
                    <Button
                      size="sm"
                      onClick={copyReferralLink}
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-purple-500 hover:bg-purple-600 rounded px-1.5 py-0.5 h-6"
                    >
                      {copied ? (
                        <CheckCircle className="w-2.5 h-2.5" />
                      ) : (
                        <>
                          <Copy className="w-2.5 h-2.5 mr-0.5" />
                          <span className="text-[9px]">Copy</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Get in Touch - Desktop only */}
            <div className="hidden md:block w-full bg-white rounded-xl shadow-sm p-3">
              <h3 className="text-sm font-bold text-[#060535] mb-2">
                Get in Touch
              </h3>
              <div className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 cursor-pointer transition-colors">
                <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                  <Twitter className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="text-xs">Twitter</span>
              </div>
            </div>
          </div>

          {/* Right list */}
          <div className="md:col-span-8">
            <div
              className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col"
              style={{ height: "480px" }}
            >
              <div className="grid grid-cols-12 px-3 md:px-4 py-2 text-[10px] font-medium text-slate-500 bg-gray-50 flex-shrink-0">
                <div className="col-span-6">NAME</div>
                <div className="col-span-3 text-center">No. Of Ref</div>
                <div className="col-span-3 text-right">Est Token</div>
              </div>

              <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
                {rows.map((r, idx) => (
                  <div
                    key={idx}
                    className={`grid grid-cols-12 items-center px-2 md:px-3 py-4 rounded-full ${getRowBg(
                      r
                    )} shadow-[inset_0_0_0_1px_rgba(0,0,0,0.03)]`}
                  >
                    <div className="col-span-6 flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={r.avatar} alt={r.name} />
                        <AvatarFallback className="text-[9px]">
                          {r.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-semibold text-slate-800">
                            {r.name}
                          </span>
                          {r.you && (
                            <Badge
                              variant="outline"
                              className="text-[8px] px-0.5 py-0"
                            >
                              You
                            </Badge>
                          )}
                        </div>
                        <div className="text-[8px] text-slate-500">
                          {r.handle}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-3 text-center text-[10px] text-slate-700">
                      {r.refs}
                    </div>
                    <div className="col-span-3 text-right">
                      <span className="inline-block rounded-full px-2 py-0.5 text-[9px] text-slate-800 bg-white/60">
                        {r.tokens}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Get in Touch - Mobile only (at the bottom) */}
        <div className="md:hidden w-full bg-white rounded-xl shadow-sm p-3 mt-4">
          <h3 className="text-sm font-bold text-[#060535] mb-2">
            Get in Touch
          </h3>
          <div className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 cursor-pointer transition-colors">
            <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
              <Image src="/images/twitter.svg" alt="twitter" width={10} height={10} className="text-white"/>
            </div>
            <span className="text-xs">Twitter</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}