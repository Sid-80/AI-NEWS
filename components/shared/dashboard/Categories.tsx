import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Categories() {
  const pathname = usePathname();

  const components: { title: string; href: string }[] = [
    {
      title: "Latest",
      href: `/dashboard`,
    },
    {
      title: "Politics",
      href: "/dashboard/politics",
    },
    {
      title: "Tech",
      href: "/dashboard/tech",
    },
    {
      title: "Budget",
      href: "/dashboard/budget",
    },
    {
      title: "Company",
      href: "/dashboard/company",
    },
  ];

  return (
    <NavigationMenu className="py-3">
      <NavigationMenuList>
        {components.map((comp, index) => (
          <NavigationMenuItem key={`${comp.title}-${index}`}>
            <Link href={comp.href} legacyBehavior passHref>
              <NavigationMenuLink className={`${pathname === comp.href ? "bg-primary text-white":"dark:bg-[#1B2430] dark:hover:bg-[#121211] hover:bg-[#D2DAFF]/60 bg-[#D2DAFF]"} font-semibold rounded-md p-2 px-3 `}>
                {comp.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
