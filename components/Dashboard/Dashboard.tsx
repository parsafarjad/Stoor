"use client";

import { useUserStore } from "@/store/userStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"; 
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"; 
import { useEffect, useState } from "react";

const chartConfig = {
  count: {
    label: "تعداد",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function Dashboard() {
  const { users, fetchUsers } = useUserStore();
  const [width, setWidth] = useState(0); 

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers();
    }
  }, [users, fetchUsers]);

  // hook برای چک کردن عرض صفحه (responsive)
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize(); // اولیه
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalUsers = users.length;
  const uniqueCities = new Set(users.map((user) => user.address.city)).size;
  const uniqueCompanies = new Set(users.map((user) => user.company.name)).size;

  const lastFiveUsers = users.slice(-5);

  const cityData = users.reduce((acc, user) => {
    const city = user.address.city;
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const chartData = Object.entries(cityData).map(([city, count]) => ({
    city,
    count,
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">داشبورد</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <Card>
          <CardHeader>
            <CardTitle>تعداد کاربران</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl">{totalUsers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>تعداد شهرها</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl">{uniqueCities}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>تعداد شرکت‌ها</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl">{uniqueCompanies}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>توزیع کاربران بر اساس شهر</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer className="max-h-[300px] w-full" config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              {width > 768 ? (
                <XAxis
                  dataKey="city"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                /> // نمایش نام شهرها در دسکتاپ
              ) : (
                <XAxis hide={true} dataKey="city" /> // پنهان کردن در تبلت و موبایل
              )}
              <YAxis tickLine={false} tickMargin={10} axisLine={false} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
              />{" "}
              <Bar dataKey="count" fill="var(--color-count)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="text-2xl">
          <CardTitle>آخرین کاربران</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-start">نام</TableHead>
                <TableHead className="text-start">ایمیل</TableHead>
                <TableHead className="text-start">شهر</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lastFiveUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.address.city}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
