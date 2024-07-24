import { Avatar, AvatarImage } from "../ui/avatar";

export default function Logo() {
  return (
        <Avatar className="w-12 h-12">
    <AvatarImage src="/2.png" alt="" className="dark:hidden" />
    <AvatarImage src="/1.png" alt="" className="hidden dark:block" />
  </Avatar>
  )
}