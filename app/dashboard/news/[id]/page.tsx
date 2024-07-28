"use client";
import DashboardLoader from "@/components/shared/dashboard/Loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetNewsById } from "@/lib/react-query/mutations";
import { RootState } from "@/lib/redux/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [newsData, setNewsData] = useState<any | null>(null);

  const { mutateAsync: getNewsByIdFn, isPending: loadingResponse } =
    useGetNewsById();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getNewsByIdFn({ id, accessToken });
        setNewsData(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  if (loadingResponse)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <DashboardLoader />
      </div>
    );

  return newsData ? (
    <div className="flex flex-1 flex-col md:px-14 xl:px-20 px-4 py-4 overflow-y-auto overflow-x-hidden">
      <Card>
        <CardHeader>
          <CardTitle>{newsData.headline}</CardTitle>
          <CardDescription className=" bg-secondary p-2 my-2 sm:p-4 rounded-md">
            <p>{newsData.summary}</p>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Image
            src={newsData.imageUrl}
            className=" bg-cover rounded-lg w-full max-w-[300px] sm:max-w-[600px]"
            alt={newsData.imageAlt}
            height={200}
            width={300}
          />
          <div className="flex items-center justify-center w-full p-4">
            <Accordion type="single" collapsible className="w-full">
              {newsData.questions.map((quest: any, index: any) => (
                <AccordionItem
                  key={`${quest.answer}-${index}`}
                  value={`item-${index + 1}`}
                >
                  <AccordionTrigger className=" sm:text-lg font-bold">
                    {quest.question}
                  </AccordionTrigger>
                  <AccordionContent>{quest.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <p className=" text-zinc-300 p-2 text-justify">
            {newsData.rawContent}
          </p>

          <CardFooter className="flex flex-col gap-1 items-start justify-start">
            <p>Source : {newsData.hostname}</p>
            <p>Published At : {newsData.publishedAt.split("T")[0]}</p>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  ) : (
    <>No data available</>
  );
}
