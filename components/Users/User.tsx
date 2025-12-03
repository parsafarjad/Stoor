"use client";

import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: { city: string };
  company: { name: string };
}

export default function Users() {
  const { users, fetchUsers } = useUserStore();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "email" | "city">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers();
    }
  }, [users, fetchUsers]);

  // فیلتر و مرتب‌سازی
  const filteredUsers = users
    .filter((user) =>
      [user.name, user.email, user.phone].some((field) =>
        field.toLowerCase().includes(search.toLowerCase())
      )
    )
    .sort((a, b) => {
      let aVal = "";
      let bVal = "";
      if (sortBy === "city") {
        aVal = a.address.city;
        bVal = b.address.city;
      } else {
        aVal = a[sortBy];
        bVal = b[sortBy];
      }
      if (sortOrder === "asc") {
        return aVal.localeCompare(bVal);
      } else {
        return bVal.localeCompare(aVal);
      }
    });

  const handleSort = (column: "name" | "email" | "city") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">کاربران</h1>

      <div className="flex justify-center w-full">

        <Input
          placeholder="جستجو بر اساس نام، ایمیل یا تلفن..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md p-5"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              onClick={() => handleSort("name")}
              className="cursor-pointer text-start"
            >
              نام {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("email")}
              className="cursor-pointer text-start"
            >
              ایمیل {sortBy === "email" && (sortOrder === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("city")}
              className="cursor-pointer text-start"
            >
              شهر {sortBy === "city" && (sortOrder === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead className="text-start">عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.address.city}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedUser(user)}
                    >
                      جزئیات
                    </Button>
                  </DialogTrigger>
                  {selectedUser && selectedUser.id === user.id && (
                    <DialogContent className="text-start">
                      <DialogHeader >
                        <DialogTitle>{selectedUser.name}</DialogTitle>
                      </DialogHeader>
                      <p>ایمیل: {selectedUser.email}</p>
                      <p>شماره تلفن: {selectedUser.phone}</p>
                      <p>شهر: {selectedUser.address.city}</p>
                      <p>شرکت: {selectedUser.company.name}</p>
                    </DialogContent>
                  )}
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
