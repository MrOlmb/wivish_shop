import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "@clerk/nextjs/server";

export default function UserInfo({ user }: { user: User | null }) {
  const role = user?.privateMetadata.role?.toString();
  return (
    <div className="px-2 py-3 mb-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <Avatar className="w-12 h-12">
          <AvatarImage
            src={user?.imageUrl}
            alt={`${user?.firstName!} ${user?.lastName!}`}
          />
          <AvatarFallback className="bg-primary text-white text-sm">
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-y-1 flex-1 min-w-0">
          <p className="font-medium text-sm truncate">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {user?.emailAddresses[0].emailAddress}
          </p>
          <Badge variant="secondary" className="capitalize text-xs w-fit">
            {role?.toLowerCase()}
          </Badge>
        </div>
      </div>
    </div>
  );
}
