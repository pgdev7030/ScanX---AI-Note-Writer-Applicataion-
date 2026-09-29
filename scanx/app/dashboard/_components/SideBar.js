"use client"
import { LayoutGridIcon, Shield, Sparkles, Plus } from "lucide-react";
import { Button } from "../../../components/components/ui/button";
import Image from "next/image";
import React from "react";
import { Progress } from "../../../components/components/ui/progress";
import UploadPdf from "./UploadPdf";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { usePathname } from "next/navigation";

function SideBar() {
  const { user } = useUser();
  const path = usePathname();
  const GetUserInfo=useQuery(api.user.GetUserInfo,{
    userEmail:user?.primaryEmailAddress?.emailAddress
  });
    const fileList = useQuery(api.pdfStorage.GetUserFiles, {
      userEmail: user?.primaryEmailAddress?.emailAddress,
    });
  return (
    <div className="h-screen p-5 bg-white dark:bg-[#0c0c14] border-r border-gray-100 dark:border-white/[0.06] flex flex-col transition-colors">
      <Link href="/" className="block mb-7 px-1">
        <Image src="/ScanX_Logo.png" alt="logo" width={170} height={50} className="dark:brightness-0 dark:invert" />
      </Link>
      <div className="mb-5">
        <UploadPdf isMaxFile={fileList?.length>=5&&!GetUserInfo?.upgrade}>
          <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white rounded-xl py-5 text-sm font-medium shadow-lg shadow-purple-500/15 hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-2">
            <Plus size={18} strokeWidth={2.5} />
            Upload PDF
          </Button>
        </UploadPdf>
      </div>
      <nav className="space-y-0.5">
        <Link href="/dashboard">
          <div className={`flex gap-3 items-center px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 text-[13px] font-medium ${
            path==='/dashboard'
              ? 'bg-gray-100 dark:bg-white/[0.07] text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-white/[0.04] hover:text-gray-800 dark:hover:text-gray-300'
          }`}>
            <LayoutGridIcon size={17} />
            <span>Workspace</span>
          </div>
        </Link>
        <Link href="/dashboard/upgrade">
          <div className={`flex gap-3 items-center px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 text-[13px] font-medium ${
            path==='/dashboard/upgrade'
              ? 'bg-gray-100 dark:bg-white/[0.07] text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-white/[0.04] hover:text-gray-800 dark:hover:text-gray-300'
          }`}>
            <Shield size={17} />
            <span>Upgrade</span>
          </div>
        </Link>
      </nav>
      <div className="mt-auto">
        {!GetUserInfo?.upgrade && (
          <div className="p-4 rounded-2xl bg-gradient-to-br from-gray-50 dark:from-white/[0.03] to-gray-50/50 dark:to-transparent border border-gray-100 dark:border-white/[0.06]">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Storage used</span>
              <span className="text-xs font-medium text-gray-400 dark:text-gray-500 tabular-nums">{fileList?.length || 0}/5</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 dark:bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${((fileList?.length || 0) / 5) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-gray-400 dark:text-gray-600 mt-2.5">{fileList?.length || 0} of 5 free uploads used</p>
            <Link href="/dashboard/upgrade">
              <p className="text-[11px] text-purple-500 dark:text-purple-400 mt-1 hover:text-purple-600 dark:hover:text-purple-300 transition-colors flex items-center gap-1 font-medium">
                <Sparkles size={10} /> Upgrade for unlimited
              </p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBar;