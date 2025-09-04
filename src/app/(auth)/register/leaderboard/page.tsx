"use client";

import React, { useState } from 'react';
import Header from '@/app/header/page';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { Trophy, Crown, Medal, Twitter, Share, Gift, Copy, CheckCircle } from 'lucide-react';

export default function LeaderboardSidebar() {
  const [referralLink, setReferralLink] = useState('https://Superapp.gg/referr=OF61A');
  const [copied, setCopied] = useState(false);


  // Top 3 users data
  const topThree = [
    {
      name: 'Sam',
      tokens: 9300,
      avatar: '/avatars/avatar4.svg',
      rank: 1,
      position: 'center'
    },
    {
      name: 'Ninja',
      tokens: 8900,
      avatar: '/avatars/avatar5.svg',
      rank: 2,
      position: 'left'
    },
    {
      name: 'Thug',
      tokens: 7010,
      avatar: '/avatars/avatar6.svg',
      rank: 3,
      position: 'right'
    }
  ];

  // Right side rows (mock)
  const rows = [
    { name: 'Mike', handle: '03D__153d143', refs: 12, tokens: 8900, you: true, avatar: '/avatars/avatar1.svg' },
    { name: 'Sam', handle: '03D__153d143', refs: 15, tokens: 9300, highlight: 'purple', avatar: '/avatars/avatar2.svg' },
    { name: 'Ninja', handle: '03D__153d143', refs: 12, tokens: 8900, avatar: '/avatars/avatar3.svg' },
    { name: 'Thug', handle: '03D__153d143', refs: 12, tokens: 7010, highlight: 'rose', avatar: '/avatars/avatar4.svg' },
    { name: 'Thor', handle: '03D__153d143', refs: 7, tokens: 6555, avatar: '/avatars/avatar5.svg' },
    { name: 'Loki', handle: '03D__153d143', refs: 5, tokens: 5400, avatar: '/avatars/avatar6.svg' },
    { name: 'Hulk', handle: '03D__153d143', refs: 3, tokens: 3200, avatar: '/avatars/avatar1.svg' },
    { name: 'Deadpool', handle: '03D__153d143', refs: 3, tokens: 3200, avatar: '/avatars/avatar2.svg' },
  ];

  const getRowBg = (r: { highlight?: 'purple' | 'rose' }) => {
    if (r.highlight === 'purple') return 'bg-[#A78BFA1A]';
    if (r.highlight === 'rose') return 'bg-[#FCA5A51A]';
    return 'bg-slate-50';
  };

  const getPodiumColor = (rank: number) => {
    switch(rank) {
      case 1: return 'bg-gradient-to-b from-purple-200 to-purple-300';
      case 2: return 'bg-gradient-to-b from-gray-200 to-gray-300';
      case 3: return 'bg-gradient-to-b from-orange-200 to-orange-300';
      default: return 'bg-gray-200';
    }
  };

  const getPodiumHeight = (rank: number) => {
    switch(rank) {
      case 1: return 'h-28';
      case 2: return 'h-24';
      case 3: return 'h-20';
      default: return 'h-16';
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch(rank) {
      case 1: return 'bg-yellow-500 text-white border-yellow-600';
      case 2: return 'bg-gray-500 text-white border-gray-600';
      case 3: return 'bg-orange-500 text-white border-orange-600';
      default: return 'bg-gray-400 text-white';
    }
  };

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Arrange podium positions: 1st - 2nd - 3rd
  const arrangedUsers = [
    topThree.find(user => user.rank === 1), // Left (1st)
    topThree.find(user => user.rank === 2), // Center (2nd) 
    topThree.find(user => user.rank === 3)  // Right (3rd)
  ].filter(Boolean) as typeof topThree; // ensure defined

  return (
    <>
      <Header/>
      {/* Background layer */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_1px_1px,rgba(6,5,53,0.06)_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
          <h1 className="text-3xl md:text-5xl font-bold text-center text-[#060535] mt-8 md:mt-12 mb-6 md:mb-10">
            Superapp Leaderboard
          </h1>

          {/* Two-column layout shell matching reference */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left card */}
            <div className="md:col-span-4">
              <div className="w-full bg-white rounded-2xl shadow-sm p-6 space-y-6">
                {/* Podium Section */}
                <div className="space-y-4">
                  {/* Combined Avatars and Podium */}
                  <div className="flex justify-center items-end space-x-4">
                    {arrangedUsers.map((user) => (
                      <div key={user.rank} className="flex flex-col items-center">
                        {/* Avatar positioned above each podium */}
                        <div className="relative mb-4">
                          <Avatar className={`${user.rank === 1 ? 'h-20 w-20' : 'h-16 w-16'} border-4 ${user.rank === 1 ? 'border-yellow-400' : user.rank === 2 ? 'border-gray-400' : 'border-orange-400'} shadow-lg`}>
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold border-2 border-white ${getRankBadgeColor(user.rank)} shadow-md`}>
                            {user.rank}
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-gray-800 mb-2">{user.name}</span>
                        
                        {/* Podium Block */}
                        <div className={`w-16 ${getPodiumHeight(user.rank)} ${getPodiumColor(user.rank)} rounded-t-lg flex flex-col items-center justify-between py-2 shadow-sm`}>
                          <div className="flex-1 flex items-center">
                            {user.rank === 1 && <Image src="/icons/trophy.svg" width={16} height={16} alt="trophy logo" className="w-4 h-4 text-yellow-600" />}
                          </div>
                          <span className="text-xs font-bold text-gray-700">{user.rank === 1 ? '1st' : user.rank === 2 ? '2nd' : '3rd'}</span>
                        </div>
                        <div className="mt-1 text-xs font-medium text-gray-600">
                          {user.tokens.toLocaleString()} Tokens
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Referral & Reward Timeline Section */}
                <div className="space-y-6 pt-4">
                  {/* Timeline container */}
                  <div className="relative">
                    {/* Vertical line - positioned to stop before the second circle */}
                    <div className="absolute left-3 top-6 w-0.5 bg-purple-300" style={{ height: 'calc(100% - 3rem)' }}></div>
                    
                    {/* Share Referral Link */}
                    <div className="relative flex items-start space-x-4">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex-shrink-0 flex items-center justify-center z-10">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div className="flex-1 pb-8">
                        <h3 className="text-lg font-bold text-purple-600 mb-2">SHARE REFERRAL LINK</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Invite Friends & Families to join Superapp.<br />
                          Share Your Link Today!
                        </p>
                      </div>
                    </div>

                    {/* Earn Reward */}
                    <div className="relative flex items-start space-x-4">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex-shrink-0 flex items-center justify-center z-10">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-purple-600 mb-2">EARN REWARD</h3>
                        <p className="text-gray-600 text-sm">
                          Boost your benefits with Superapp.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Referral Link Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500">Referral Link</label>
                    <div className="relative">
                      <Input 
                        value={referralLink}
                        readOnly
                        className="text-sm bg-white border-2 border-gray-300 rounded-lg pr-20 py-3"
                      />
                      <Button 
                        size="sm" 
                        onClick={copyReferralLink}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-500 hover:bg-purple-600 rounded-md px-3"
                      >
                        {copied ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-1" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right list */}
            <div className="md:col-span-8">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {/* Header row */}
                <div className="grid grid-cols-12 px-4 md:px-6 py-3 text-xs font-medium text-slate-500">
                  <div className="col-span-6">NAME</div>
                  <div className="col-span-3 text-center">No. Of Ref</div>
                  <div className="col-span-3 text-right">Est Token</div>
                </div>
                <div className="px-2 pb-4 space-y-3">
                  {rows.map((r, idx) => (
                    <div
                      key={idx}
                      className={`grid grid-cols-12 items-center px-4 md:px-6 py-3 rounded-full ${r.you ? 'bg-slate-100' : getRowBg(r)} shadow-[inset_0_0_0_1px_rgba(0,0,0,0.03)]`}
                    >
                      <div className="col-span-6 flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={r.avatar} alt={r.name} />
                          <AvatarFallback>{r.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-slate-800">{r.name}</span>
                            {r.you && <Badge variant="outline" className="text-[10px]">You</Badge>}
                          </div>
                          <div className="text-[11px] text-slate-500">{r.handle}</div>
                        </div>
                      </div>
                      <div className="col-span-3 text-center text-sm text-slate-700">{r.refs}</div>
                      <div className="col-span-3 text-right">
                        <span className="inline-block rounded-full px-3 py-1 text-sm text-slate-800 bg-white/60">
                          {r.tokens}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}