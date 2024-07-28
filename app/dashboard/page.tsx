"use client";
import DashboardLoader from "@/components/shared/dashboard/Loader";
import { Badge } from "@/components/ui/badge";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useToast } from "@/components/ui/use-toast";
import { useCheckHealth, useGetAllNews } from "@/lib/react-query/mutations";
import { logOut } from "@/lib/redux/Auth/auth-slice";
import { RootState } from "@/lib/redux/store";
import { NewsItem } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const id = useSelector((state: RootState) => state.auth.id);
  const router = useRouter();
  const dispatch = useDispatch();
  const { mutateAsync: checkHealthFn, isPending: loadingResponse1 } =
    useCheckHealth();
  const {
    mutateAsync: getAllNewsFn,
    isPending: loadingResponse2,
    isSuccess,
    isError,
  } = useGetAllNews();
  const { toast } = useToast();

  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsData, setNewsData] = useState<NewsItem[] | null>(null);
  const [before, setBefore] = useState<number | null>(null);

  if (!isAuth) router.push("/signin");

  useEffect(() => {
    const check = async () => {
      try {
        await checkHealthFn({ id, accessToken });
      } catch (err) {
        toast({
          title: "Session expired!",
          description: "Re-login. It's for your safety",
        });
        dispatch(logOut());
        router.push("/signin");
      }
    };
    check();
  }, []);

  const getNextNews = async () => {
    try {
      const res = await getAllNewsFn({
        limit: 20,
        before: before,
        after: null,
      });
      setNewsData(res.data.newsList);
      setBefore(res.data.newsList[res.data.newsList.length - 1].newsId);
    } catch (err) {
      console.log(err);
    }
  };

  const getPrevNews = async () => {
    try {
      const res = await getAllNewsFn({
        limit: 20,
        before: before! + 40,
        after: null,
      });
      console.log(res.data);
      setNewsData(res.data.newsList);
      setBefore(res.data.newsList[res.data.newsList.length - 1].newsId);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getAllNewsFn({
          limit: 20,
          before: null,
          after: null,
        });
        console.log(res.data);
        setTotalPages(res.data.totalPages);
        setNewsData(res.data.newsList);
        setBefore(res.data.newsList[res.data.newsList.length - 1].newsId);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  if (loadingResponse1 || loadingResponse2)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <DashboardLoader />
      </div>
    );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (page === 1) {
      setBefore(null);
    }
  };

  const displayRange = 4;
  const startPage = Math.max(1, currentPage - displayRange);
  const endPage = Math.min(totalPages ?? 1, currentPage + displayRange);

  return (
    <div className=" flex-1 max-h-full overflow-y-auto overflow-x-hidden flex flex-col items-center w-full justify-start">
      <h1 className=" text-xl p-2 font-bold tracking-[2px] animate-pulse">Latest News</h1>
      <div className="flex-1 max-h-full overflow-y-auto overflow-x-hidden flex flex-col items-center w-full justify-start">
        {newsData && <HoverEffect items={newsData!} />}
      </div>
      <div className="flex items-center justify-center w-full">
        {totalPages && (
          <Pagination>
            <PaginationContent>
              {currentPage !== 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    className=" cursor-pointer"
                    onClick={() => {
                      handlePageChange(currentPage - 1);
                      getPrevNews();
                    }}
                  />
                </PaginationItem>
              )}
              {startPage > 1 && (
                <>
                  <PaginationItem>
                    <PaginationLink
                      className=" cursor-pointer"
                      onClick={() => handlePageChange(1)}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  {startPage > 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                </>
              )}
              <PaginationItem>
                <PaginationLink
                  className=" cursor-pointer"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  {currentPage}
                </PaginationLink>
              </PaginationItem>
              {endPage < totalPages && (
                <>
                  {endPage < totalPages - 1 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink
                      className=" cursor-pointer"
                      onClick={() => handlePageChange(totalPages)}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}
              {currentPage !== totalPages && (
                <PaginationItem>
                  <PaginationNext
                    className=" cursor-pointer"
                    onClick={() => {
                      handlePageChange(currentPage + 1);
                      getNextNews();
                    }}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
