import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/android-chrome-192x192.png" alt="用户头像" />
          <AvatarFallback>用户</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">张三</p>
          <p className="text-sm text-muted-foreground">zhangsan@example.com</p>
        </div>
        <div className="ml-auto font-medium">+￥1,999.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/android-chrome-192x192.png" alt="用户头像" />
          <AvatarFallback>用户</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">李四</p>
          <p className="text-sm text-muted-foreground">lisi@example.com</p>
        </div>
        <div className="ml-auto font-medium">+￥39.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/android-chrome-192x192.png" alt="用户头像" />
          <AvatarFallback>用户</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">王五</p>
          <p className="text-sm text-muted-foreground">wangwu@example.com</p>
        </div>
        <div className="ml-auto font-medium">+￥299.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/android-chrome-192x192.png" alt="用户头像" />
          <AvatarFallback>用户</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">赵六</p>
          <p className="text-sm text-muted-foreground">zhaoliu@example.com</p>
        </div>
        <div className="ml-auto font-medium">+￥99.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/android-chrome-192x192.png" alt="用户头像" />
          <AvatarFallback>用户</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">钱七</p>
          <p className="text-sm text-muted-foreground">qianqi@example.com</p>
        </div>
        <div className="ml-auto font-medium">+￥39.00</div>
      </div>
    </div>
  );
}
